import Mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    unique: true,
    required: true
  },
  avatar: { type: String },
  bio: { type: String },
  favoriteWines: [{ type: String }],
  favoriteBrands: [{ type: String }],
  favoriteWineTypes: [{ type: String }],
  favoriteWineries: [{ type: String }],
  favoriteWineColors: [{ type: String }]
});

const Profile = Mongoose.model('profile', profileSchema);

export default Profile;
