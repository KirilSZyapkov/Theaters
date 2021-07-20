const er = require('../config/err');

module.exports = {
    async openEdit(req, res) {
        const id = req.params.id;
        const data = await req.storage.getPlayById(id);
        req.user.isLog = Boolean(req.user);
        const user = req.user;

        res.render('theaterPages/edit', {
            title: 'Edit',
            user,
            data
        })
    },

    async editPlay(req, res) {
        const id = req.params.id;
        const body = req.body;
        try {

            await req.storage.editPlayById(id, body);
            res.redirect('/theater/details/' + id);
        } catch (err) {
            const errorList = er(err);
            req.user.isLog = Boolean(req.user);
            const user = req.user;
            const data = await req.storage.getPlayById(id);
            res.render('theaterPages/edit', {
                errors: errorList.split('\n'),
                title: 'Edit',
                user,
                data
            })
        }
    }
}