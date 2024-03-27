import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: "products"
        },
        quantity: {
            type: Number,
            require: true
        }
    }]
});

export default mongoose.model('Cart', cartSchema);