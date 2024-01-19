var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Review = require("../models/Review.js");
const User = require("../models/User.js");

const isAuthenticated = require("../middleware/isAuthenticated");
const isOwner = require("../middleware/isOwner");

router.post("/:cocktailId", isAuthenticated, (req, res, next) => {
  const { title, review } = req.body;

  Review.create({
    title,
    review,
    userOwner: req.user._id,
    userCocktail: req.params.cocktailId,
  })
    .then((createdReview) => {
      console.log("New Review ==>", createdReview);
      res.json(createdReview);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/", (req, res, next) => {
  Review.find()
    .populate("userOwner")
    .then((foundReview) => {
      console.log("Found Reviews ==>", foundReview);
      res.json(foundReview);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/user-reviews", isAuthenticated, (req, res, next) => {
  console.log("User", req.user)
  Review.find({ userOwner: req.user._id })
  .populate('userCocktail')
    .then((foundReviews) => {
      res.json(foundReviews);
    })
    .catch((error) => res.json(error));
});

router.get("/:reviewId", (req, res, next) => {
  const { reviewId } = req.params;

  console.log("Params", reviewId);

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Review document has a `review` array holding `_id`s of Review documents
  // We use .populate() method to get swap the `_id`s for the actual Review documents
  Review.findById(reviewId)
    .then((review) => {
      console.log("this review", review);
      res.status(200).json(review);
    })
    .catch((error) => res.json(error));
});

// PUT  /api/:reviewId  -  Updates a specific review by id
router.put("/:reviewId", isAuthenticated, isOwner, (req, res, next) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Review.findByIdAndUpdate(reviewId, req.body, { new: true })
    .then((updatedReview) => res.json(updatedReview))
    .catch((error) => res.json(error));
});

// DELETE  /api/:reviewId  -  Deletes a specific review by id
router.delete("/:reviewId", isAuthenticated, isOwner, (req, res, next) => {
  const { reviewId } = req.params;

  console.log("REVIEW", reviewId);

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Review.findByIdAndDelete(reviewId)
    .then(() =>
      res.json({
        message: `Project with ${reviewId} was removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
