import jsonParser from 'bodyParser';
import { Router } from 'express';
import bearerAuth from '../lib/bearer-auth.js';
import Review from '../model/review.js';
import Profile from '../model/profile.js';

const reviewRouter = (module.exports = new Router());

reviewRouter.post('/api/reviews', jsonParser, bearerAuth, (req, res, next) => {
  req.body.userId = req.user._id;
  new Review(req.body)
    .save()
    .then(review => res.status(201).json(review))
    .catch(next);
});

reviewRouter.get('/api/reviews/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => res.status(200).json(review))
    .catch(next);
});

reviewRouter.get('/api/reviews', (req, res, next) => {
  let pageNumber = Number(req.query.page);
  if (!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  Review.find({})
    .sort({ timeStamp: 'asc' })
    .skip(pageNumber * 5)
    .limit(5)
    .then(review => res.status(200).json(review))
    .catch(next);
});

reviewRouter.put(
  '/api/reviews/:id',
  jsonParser,
  bearerAuth,
  (req, res, next) => {
    req.body.userId = req.user._id;
    Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .then(review => res.status(202).json(review))
      .catch(next);
  }
);

reviewRouter.delete('/api/reviews/:id', bearerAuth, (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => review.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
});
