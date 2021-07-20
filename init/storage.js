const Play = require('../models/Play');
const User = require('../models/User');

function initStorage() {
    return (req, res, next) => {
        req.storage = {
            creatPlay,
            getAllPlays,
            getTopThreePlay,
            getPlayById,
            editPlayById,
            deletePlayById,
            likePlayById,
            getAllSortedByLikes
        }
        next()
    }
}

async function creatPlay(data, ownerId) {
    const owner = ownerId;
    const title = data.title.trim();
    const description = data.description.trim();
    const imageUrl = data.imageUrl;
    const isPublic = Boolean(data.checkBox);

    if (title === '' || description === '' || imageUrl === '') {
        throw new Error('All fields are reuired!');
    }

    const body = { owner, title, description, imageUrl, isPublic }

    const play = new Play(body);

    await play.save();

}

async function getAllPlays() {
    return Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
}

async function getTopThreePlay() {
    return Play.find({}).sort({ _likes: -1 }).limit(3).lean();
}

async function getAllSortedByLikes() {
    return Play.find({}).sort({ _likes: -1 }).lean();
}

async function getPlayById(id) {
    return Play.findById(id).lean();
}

async function editPlayById(id, body) {
    const title = body.title.trim();
    const description = body.description.trim();
    const imageUrl = body.imageUrl;

    if (title === '' || description === '' || imageUrl === '') {
        throw new Error('All fields are reuired!');
    }

    if (body.isPublic === undefined) {
        body.isPublic = false;
    }

    const play = await Play.findById(id);
    await play.updateOne(body);
}

async function likePlayById(id, userId) {
    const play = await Play.findById(id);
    play._likes++;
    play.usersLiked.push(userId);
    console.log(play)
    await play.save();
}

async function deletePlayById(id) {
    await Play.findByIdAndDelete(id);
}

module.exports = initStorage;