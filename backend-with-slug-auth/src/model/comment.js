import Mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    unique: true,
    required: true
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile',
    unique: true,
    required: true
  },
  content: { type: String },
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
