module.exports = async (req, res) => {
    const id = req.params.id;
    await req.storage.deletePlayById(id);
    res.redirect('/theater');
}