const { model, Schema, default: mongoose } = require("mongoose");

const reviewSchema = new Schema(
  {
    review: { type: String },
    cocktail: {
      type: mongoose.Types.ObjectId,
      ref: "Cocktail",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", reviewSchema);
