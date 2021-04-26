const mongoose = require('mongoose')
const FunnelSchema = mongoose.Schema({
    name: { type: String },
    json: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Funnel', FunnelSchema)