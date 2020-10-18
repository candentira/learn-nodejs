import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    if (['/login'].includes(req.path)) {
        return next();
    }
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send();
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send();
        }
        req.user = user;
        next();
    });
};
