const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
