import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], unique: true },
    available: { type: Boolean, default: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        default: 0
    },
    description: { type: String, },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }

});

export const ProductModel = mongoose.model('Product', productSchema);