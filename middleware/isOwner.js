const Cocktail = require('../models/Cocktail')
const Review = require("../models/Review")

const isOwner = (req, res, next) => {
  Cocktail.findById(req.params.cocktailId)
    .then((foundCocktail) => {
      if (foundCocktail.userOwner.toString() === req.user._id) {
        next();
      } else {
        res
          .status(401)
          .json({
            message: "You are not authorized to perform this operation",
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });

    Review.findById(req.params.reviewId)
    .then((foundreview) => {
      if (foundreview.userOwner.toString() === req.user._id) {
        next();
      } else {
        res
          .status(401)
          .json({
            message: "You are not authorized to perform this operation",
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = isOwner;
