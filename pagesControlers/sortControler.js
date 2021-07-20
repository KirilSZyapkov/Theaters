module.exports = {
    async sortByDate(req, res) {
        req.user.isLog = Boolean(req.user);
        const user = req.user;
        const data = await req.storage.getAllPlays();
        res.render('userPages/user-home', {
            title: 'Home Page',
            user,
            data
        })
    },
    async sortByLikes(req, res) {
        req.user.isLog = Boolean(req.user);
        const user = req.user;
        const data = await req.storage.getAllSortedByLikes();
        res.render('userPages/user-home', {
            title: 'Home Page',
            user,
            data
        })
    }
}