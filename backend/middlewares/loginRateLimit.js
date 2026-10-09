/*-----------------------------------------------------------

LIMITATION DES TENTATIVES DE CONNEXION (anti brute-force)

Compteur en mémoire par adresse IP : suffisant pour un seul compte admin
et au plus 2 instances App Engine (chaque instance a son propre compteur).

-----------------------------------------------------------*/

const WINDOW_MS = 15 * 60 * 1000; // fenêtre de 15 minutes
const MAX_FAILED_ATTEMPTS = 10;

const failedAttempts = new Map(); // ip -> { count, resetAt }

// App Engine renseigne X-Appengine-User-Ip et écrase toute valeur envoyée par le client
function getClientIp(req) {
  return req.get('x-appengine-user-ip') || req.ip;
}

function purgeExpired(now) {
  for (const [ip, entry] of failedAttempts) {
    if (entry.resetAt <= now) failedAttempts.delete(ip);
  }
}

function loginRateLimit(req, res, next) {
  const now = Date.now();
  purgeExpired(now);

  const ip = getClientIp(req);
  const entry = failedAttempts.get(ip);

  if (entry && entry.count >= MAX_FAILED_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    res.setHeader('Retry-After', retryAfter);
    return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans quelques minutes.' });
  }

  // le contrôleur appelle ces fonctions selon le résultat de la connexion
  req.loginAttempt = {
    failed: () => {
      const current = failedAttempts.get(ip);
      if (current) {
        current.count += 1;
      } else {
        failedAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
      }
    },
    succeeded: () => failedAttempts.delete(ip),
  };

  next();
}

module.exports = loginRateLimit;
