const Cocktail = require('../models/Cocktail')

const isOwner = (req, res, next) => {
  Cocktail.findById(req.params.cocktailId)
    .then((foundCocktail) => {
      if (foundCocktail.owner.toString() === req.user._id) {
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
