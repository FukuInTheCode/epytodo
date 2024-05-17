const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        res.status(401).json({"msg": "No token , authorization denied"});
        return;
    }
    if (!header.split(' ')[0] || header.split(' ')[0] !== 'Bearer') {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
    const token = header.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.status(401).json({"msg": "Token is not valid"});
            return;
        }
        req.user_email = user["email"];
        next();
    });
};
