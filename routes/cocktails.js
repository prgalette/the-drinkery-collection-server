var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Cocktail = require("../models/Cocktail");
const User = require("../models/User");

const isAuthenticated = require("../middleware/isAuthenticated");
const isOwner = require("../middleware/isOwner");

router.post("/", isAuthenticated, (req, res, next) => {
  const { name, ingredients, instructions, category, alcoholic, measures, photo } = req.body;

  let theseIngredients = ingredients.split(", ")
  let theseMeasures = measures.split(", ")

  Cocktail.create({
    name,
    ingredients: theseIngredients,
    instructions,
    category,
    alcoholic,
    measures: theseMeasures,
    photo,
    userOwner: req.user._id
  })
    .then((createdCocktail) => {
      console.log("New Cocktail ==>", createdCocktail);
      res.json(createdCocktail);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/", (req, res, next) => {
  Cocktail.find()
    .populate("userOwner")
    .then((foundCocktail) => {
      console.log("Found Projects ==>", foundCocktail);
      res.json(foundCocktail);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/:cocktailId", (req, res, next) => {
  const { cocktailId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cocktailId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Cocktail document has a `cocktail` array holding `_id`s of Cocktail documents
  // We use .populate() method to get swap the `_id`s for the actual Cocktail documents
  Cocktail.findById(cocktailId)
    .populate("cocktail owner")
    .then((cocktail) => res.status(200).json(cocktail))
    .catch((error) => res.json(error));
});

// PUT  /api/:cocktailId  -  Updates a specific cocktail by id
router.put("/:cocktailId", isAuthenticated, isOwner, (req, res, next) => {
  const { cocktailId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cocktailId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cocktail.findByIdAndUpdate(cocktailId, req.body, { new: true })
    .then((toPopulate) => toPopulate.populate("tasks"))
    .then((updatedCocktail) => res.json(updatedCocktail))
    .catch((error) => res.json(error));
});

// DELETE  /api/:cocktailId  -  Deletes a specific cocktail by id
router.delete("/:cocktailId", isAuthenticated, isOwner, (req, res, next) => {
  const { cocktailId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cocktailId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cocktail.findByIdAndRemove(cocktailId)
    .then(() =>
      res.json({
        message: `Project with ${cocktailId} was removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
