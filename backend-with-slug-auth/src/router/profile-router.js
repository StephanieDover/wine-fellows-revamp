import jsonParser from 'bodyParser';
import { Router } from 'express';
import s3Upload from '../middleware/s3-upload.js';
import bearerAuth from '../middleware/bearer-auth.js';
import Profile from '../model/profile.js';

const profileRouter = (module.exports = new Router());

profileRouter.post(
  '/api/profiles',
  bearerAuth,
  s3Upload('avatar'),
  (req, res, next) => {
    req.body.avatar = req.s3Data.Location;
    req.body.userId = req.user._id;
    new Profile(req.body)
      .save()
      .then(profile => res.status(201).json(profile))
      .catch(next);
  }
);

profileRouter.put(
  '/api/profiles/:id',
  bearerAuth,
  jsonParser,
  (req, res, next) => {
    let options = {
      new: true,
      runValidators: true
    };
    req.body.userId = req.user._id;
    Profile.findByIdAndUpdate(req.params.id, req.body, options)
      .then(profile => res.status(202).json(profile))
      .catch(next);
  }
);

profileRouter.get('/api/profiles/:id', (req, res, next) => {
  Profile.findOne({ _id: req.params.id })
    .then(profile => res.json(profile))
    .catch(next);
});
