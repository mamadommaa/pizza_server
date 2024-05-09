

import mongoose from 'mongoose';

const PizzaSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    types: {
        type: [Number],
        required: true,
    },
    sizes: {
        type: [Number],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('Pizza', PizzaSchema, "pizzas");