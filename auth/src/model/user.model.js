const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  mda: { type: String },
  email: { type: String, index: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  status: { type: String, enum: ["active", "suspended"], default: "active" },
  userType: {
    type: String,
    enum: [
      "MDA Data Entry",
      "MDA Reviewer",
      "MDA Approver",
      "PCO Reviewer",
      "PCO Approver",
      "Presidency Viewer",
      "Presidency Report",
      "Public Viewer",
      "Public Feedback"],

  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
