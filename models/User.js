const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: "Email is required.",
  },
  password: {
    type: String,
    trim: true,
    required: "Password is required.",
  },
  firstName: {
    type: String,
    trim: true,
    required: "First name is required.",
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last name is required.",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  excursions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Excursion",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;