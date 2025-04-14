const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName:{
        type: String,
    },
    phoneNumber:{
        type: String,
    },
    address:{
        type: String,
    },
    state:{
        type: String,
    },
    city:{
        type: String,
    },
    postalCode:{
        type: String,
    },
})

module.exports = mongoose.model('Address', addressSchema);