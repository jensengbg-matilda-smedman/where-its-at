const jwt = require('jsonwebtoken');
const { getUserById } = require('../models/db');

/* Authentication for users */

module.exports = {
    async admin(req, res, next) {
        try {
            const token = req.headers('Authorization').replace('Bearer', '');
            const data = jwt.verify(token, 'AaBbCc123');
            const user = await getUserById(data);

            if(user.role !== 'admin') {
                throw new Error();
            }

            req.user = user;
            next();

        } catch (error) {
            res.send(JSON.stringify({ success: false, error: 'Token is not valid'}));
        }
    },
    async staff(req, res, next) {
        try {
            const token = req.headers('Authorization').replace('Bearer', '');
            const data = jwt.verify(token, 'AaBbCc123');
            const user = await getUserById(data);

            req.user = user;
            next();

        } catch (error) {
            res.send(JSON.stringify({ success: false, error: 'Token is not valid'}));
        }
    }
}