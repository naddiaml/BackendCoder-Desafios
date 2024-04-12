import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    email: {
        type: String
    },
    message: {
        type: String
    }
});

export default mongoose.model('Message', messageSchema);