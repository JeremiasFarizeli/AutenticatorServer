const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const tokenParts = token.split(' ');

    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // Adiciona o usuário decodificado ao req
        req.user = { id: decoded.userId, username: decoded.username };

        next();

    });
};
