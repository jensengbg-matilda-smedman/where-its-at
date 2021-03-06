const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = new Router();
const { getUserName } = require('../models/db');
const { matchPassword } = require('../models/hashpass');

/* Check user */

router.post('/login', async (req, res) => {
    const body = req.body;

    const resObj = {
        success: false
    }
    
    const user = await getUserName(body);
    const match = await matchPassword(body.password, user.password);

    if (user && match) {
        const token = jwt.sign({ uuid: user.uuid }, 'AaBbCc123', {
            expiresIn: 600,
        });

        resObj.success = true;
        resObj.token = token;
        resObj.role = user.role;
    } 

    res.send(JSON.stringify(resObj));
});

/* Save token from login */

router.get('/loggedin', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer', '');

    let resObj = {
        loggedIn: false
    }

    if (token !== 'null') {
        const user = jwt.verify(token, 'AaBbCc123');

        if (user) {
            resObj.loggedIn = true;
            resObj.user = user;
        }
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router;