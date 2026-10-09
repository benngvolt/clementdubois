const User = require('../models/user')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

exports.logIn = async (req, res) => {
    const { username, password } = req.body || {};

    // on refuse tout ce qui n'est pas du texte (ex. { "$ne": null } injecté dans la requête MongoDB)
    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
        return res.status(400).json({ message: 'Identifiants manquants.' }); // status 400 'Bad Request'
    }

    try {
        const user = await User.findOne({ username });
        const valid = user ? await bcrypt.compare(password, user.password) : false;

        if (!valid) {
            req.loginAttempt?.failed();
            // même message dans les deux cas pour ne pas révéler si l'utilisateur existe
            return res.status(401).json({ message: 'Paire username/mot de passe incorrecte' }); // status 401 'Unauthorized'
        }

        req.loginAttempt?.succeeded();
        res.status(200).json({ // status 200 'OK'
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_TOKEN,
                { expiresIn: '24h', algorithm: 'HS256' }
            )
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur.' }); // status 500 'Internal Server Error'
    }
};
