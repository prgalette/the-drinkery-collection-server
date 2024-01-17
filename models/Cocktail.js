const { model, Schema, default: mongoose } = require("mongoose");

const cocktailSchema = new Schema(
  {
    name: { type: String},
    ingredients: [{ type: String }],
    instructions: { type: String},
    category: String,
    alcoholic: String,
    measures: [String],
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/dxl0hu3v9/image/upload/v1705181010/no_image_available_upjm4p.jpg",
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

module.exports = model("Cocktail", cocktailSchema);
