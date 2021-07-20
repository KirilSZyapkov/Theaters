
module.exports = {
    async openDetails(req, res) {
        const id = req.params.id;
        const data = await req.storage.getPlayById(id) || {};
        req.user.isLog = Boolean(req.user);
        req.user.isOwner = data.owner === req.user._id;
        req.user.isLike = data.usersLiked.find(u => u._id.toString() === req.user._id);
        const user = req.user;

        res.render('theaterPages/details', {
            title: 'Details',
            user,
            data
        })

    },

    async likePlay(req, res) {
        const id = req.params.id;
        await req.storage.likePlayById(id, req.user._id);
        res.redirect('/theater/details/' + id);
    }
}