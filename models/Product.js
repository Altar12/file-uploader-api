const mongoose = require('mongoose');
const axios = require('axios');
const BadRequest = require('../errors/bad-request');
const { INVALID_URL, NON_IMAGE_RESOUCE } = require('../errors/user-messages');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price']
    },
    image: {
        type: String,
        required: [true, 'Please provide product image URL']
    }
}, { timestamps: true });

ProductSchema.pre('save', async function() {
    try {
        const response = await axios.head(this.image);
        const contentType = response.headers['content-type'];
        if (!contentType.startsWith('image')) {
            throw new BadRequest(NON_IMAGE_RESOUCE);
        }
    } catch (error) {
        throw new BadRequest(INVALID_URL);
    }
});

module.exports = mongoose.model('Product', ProductSchema);