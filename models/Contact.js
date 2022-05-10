const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    skills: {
      type: [String],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
