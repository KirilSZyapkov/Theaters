const er = require('../config/err');

module.exports = {
    openRegister(req, res) {
        res.render('userPages/register', {
            title: 'Register'
        });
    },

    async createNewUser(req, res) {
        
        try {
            await req.auth.register(req.body);
            res.redirect('/theater')
        } catch (err) {
            const errorList = er(err);
            const data = req.body;
            res.render('userPages/register',{
                title: 'Register',
                errors: errorList.split('\n'),
                data
            })
        }
    }
}