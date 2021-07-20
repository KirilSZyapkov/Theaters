module.exports = async (req, res) => {
    if (req.user) {
        req.user.isLog = Boolean(req.user);
        const user = req.user;
        const data = await req.storage.getAllPlays();

        res.render('userPages/user-home', {
            title: 'Home Page',
            user,
            data
        });
    } else {
        const data = await req.storage.getTopThreePlay();

        res.render('userPages/guest-home', {
            title: 'Home Page',
            data,
        });
    }
}