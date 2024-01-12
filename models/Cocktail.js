const { model, Schema } = require("mongoose");

const cocktailSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    photo: {
      type: String,
    },
    // userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cocktail", cocktailSchema);