const { Schema, model } = require('mongoose');

const schema = new Schema({
   userName: { type: String, required: true, minLength: [3, 'The username should be at least 3 characters long and should consist only english letters and digits!'] },
   hashPassword: { type: String, required: true },
   likedPlays: [{ type: Schema.Types.ObjectId, ref: 'Play' }]
});

module.exports = model('User', schema);