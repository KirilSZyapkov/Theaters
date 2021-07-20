const er = require('../config/err');

module.exports = {
    openCreat(req, res) {
        req.user.isLog = Boolean(req.user);
        const user = req.user
        res.render('theaterPages/create', {
            title: 'Create Play',
            user
        });
    },

    async creatNewPlay(req, res) {

        try {
            await req.storage.creatPlay(req.body, req.user._id);
            res.redirect('/theater');
        } catch (err) {
            const errorList = er(err);
            const data = req.body;
            req.user.isLog = Boolean(req.user);
            const user = req.user
            res.render('theaterPages/create', {
                title: 'Create Play',
                errors: errorList.split('\n'),
                data,
                user
            })
        }
    }
}