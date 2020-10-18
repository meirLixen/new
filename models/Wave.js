const mongoose = require('mongoose')

 const waveSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    type: String,
    body: String,
    accepted: Boolean,
    files: [String],
    conversation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Conversation'
    }
})
module.exports = mongoose.model('Wave', waveSchema)

 