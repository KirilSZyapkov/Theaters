const { Schema, model } = require('mongoose');

const schema = new Schema({
    owner: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true, match: [/^https?:\/\//, 'Image link must start with http(s)://'] },
    isPublic: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    usersLiked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    _likes: { type: Number, default: 0 }
});

module.exports = model('Play', schema);