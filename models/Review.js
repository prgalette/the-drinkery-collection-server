const { model, Schema, default: mongoose } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: { type: String },
    review: { type: String },
    cocktail: {
      type: mongoose.Types.ObjectId,
      ref: "Cocktail",
    },
    userOwner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", reviewSchema);
