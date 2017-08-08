import Mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    unique: true,
    required: true
  },
  content: { type: String },
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model('review', reviewSchema);

export default Review;
