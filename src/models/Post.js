import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
    name: String,
    email: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    postPhoto: { type: String, required: true },
    description: { type: String, required: true },
    reactions: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    date: { type: Date, required: true, default: Date.now() }
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
