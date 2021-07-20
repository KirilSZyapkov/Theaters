const er = require('../config/err');

module.exports = {
    openLogin(req, res) {
        res.render('userPages/login', {
            title: 'Login'
        })
    },

    async loginUser(req, res) {
        try {
            await req.auth.login(req.body);
            res.redirect('/theater');
        } catch (err) {
            const errorList = er(err);
            res.render('userPages/login',{
                title: 'Login',
                errors: errorList.split('\n'),
            })
        }
    }
}