const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: { type: String },
    review: { type: String },
    userCocktail: {
      type: Schema.Types.ObjectId,
      ref: "Cocktail",
    },
    userOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", reviewSchema);
