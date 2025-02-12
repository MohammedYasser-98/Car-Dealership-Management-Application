const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    options: {
        type: String,
        enum: ['low', 'mid', 'high'],
      },

      description: {
        type: String,
        required: true
    },

    engine: {
        type: Number,
        required: true
    },
    
    fuel: {
        type: String,
        enum: ['petrol', 'diesel'],
    },
    
      img: {
        type: String,
        required: true
    },
}, 

)





const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cars: [listingSchema]
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User