const User = require('../models/User');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { SECRET_Key } = require('../config/confing');

function authInit() {
    return (req, res, next) => {
        req.auth = {
            login,
            register,
            logout
        }

        if (reatToken(req)) {
            next();
        }


        async function login(data) {

            if (data.userName === '' || data.password === '') {
                throw new Error('All fields are required!');
            }
            const user = await User.findOne({ userName: data.userName.trim() }).lean() || {};

            if (user.userName === data.userName) {
                const isMatch = await bcrypt.compare(data.password.trim(), user.hashPassword);
                if (isMatch) {
                    req.user = creatToken(user);
                } else {
                    throw new Error('Wrong password!');
                }
            } else {
                throw new Error('Wrong user name!');
            }

        }

        async function register(data) {
            if (data.userName === '' || data.password === '' || data.rePass === '') {
                throw new Error('All fields are required!');
            }
            if (data.password !== data.rePass) {
                throw new Error('Passwords do not match!');
            }
            if (data.password.trim().length < 3) {
                throw new Error('The password should be at least 3 characters long and should consist only english letters and digits!');
            }

            const userName = data.userName.trim();
            const hashPassword = await bcrypt.hash(data.password.trim(), 10);

            const user = new User({ userName, hashPassword });
            await user.save();
            req.user = creatToken(user);

        }

        async function logout() {
            res.clearCookie('Theater_Cookie');
        }

        function creatToken(user) {
            const theaterToken = {
                _id: user._id,
                user: user.userName
            }

            const token = jwt.sign(theaterToken, SECRET_Key);
            res.cookie('Theater_Cookie', token, { httpOnly: true });

            return theaterToken

        }

        function reatToken(req) {
            const token = req.cookies['Theater_Cookie'];

            if (token) {
                try {
                    const data = jwt.verify(token, SECRET_Key);
                    req.user = data;
                } catch (err) {
                    res.clearCookie('Theater_Cookie');
                    res.redirec('/auth/login');
                    return false;
                }
            }
            return true;
        }
    }
}

module.exports = authInit;