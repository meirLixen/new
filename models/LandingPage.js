const mongoose = require('mongoose')
const LandingPageSchema = mongoose.Schema({
    name: { type: String, require: true},
    bg_color_page: { type: String },
    landing_page_dir: { type: String },
    first_label: { type: String },
    second_label: { type: String },
    third_label: { type: String },
    four_label: { type: String },
    bg_color_button: { type: String },
    button_value_color: { type: String },
    button_value: { type: String },
    title: { type: String },
    title_color: { type: String },
    content_value: { type: String },
    content_color: { type: String },
    redirect: { type: String },
    required_of_first_label: { type: Boolean },
    required_of_second_label: { type: Boolean },
    required_of_third_label: { type: Boolean },
    required_of_four_label: { type: Boolean },
    check_content: { type: Boolean },
    check_tb_title: { type: Boolean },
    check_full_name: { type: Boolean },
    check_email: { type: Boolean },
    check_message: { type: Boolean },
    check_phone: { type: Boolean },
    to_whom_send_leads: [{ type: String }],
    img: { type: String },
    viewers:[
        {date:{type:Date},amount:{type:Number}}
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('LandingPage', LandingPageSchema)