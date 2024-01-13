const { model, Schema, default: mongoose } = require("mongoose");

const cocktailSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/dxl0hu3v9/image/upload/v1705181010/no_image_available_upjm4p.jpg",
    },
    userOwner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cocktail", cocktailSchema);
