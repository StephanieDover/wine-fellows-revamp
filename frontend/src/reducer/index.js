import { combineReducers } from 'redux';
import auth from './auth.js';
import userProfile from './profile.js';
import userComments from './comment.js';
import userReviews from './review.js';

export default combineReducers({
  auth,
  userProfile,
  userComments,
  userReviews
});
