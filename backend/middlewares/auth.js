const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const [scheme, token] = (req.headers.authorization || '').split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Authentification requise.' }); // status 401 'Unauthorized'
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN, { algorithms: ['HS256'] });
        req.auth = {
            userId: decodedToken.userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Session expirée ou invalide.' }); // status 401 'Unauthorized'
    }
};
