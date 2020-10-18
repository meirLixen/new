const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  starred: Boolean,
  source: String,
  marked: Boolean,
  subject: String,
  readed: { type: Boolean, default: false },
  waves: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wave" }],
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //for anonymous conversations
  ipConnect: String,
});
module.exports = mongoose.model('Conversation', conversationSchema)

