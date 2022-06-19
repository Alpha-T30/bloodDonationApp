const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bloodGroupId: {
      type: String,

      require: true,
    },
    // districtId: { type: String, required: true },
    // subDistrictId: { type: String, required: true },
    bloodGroup: {
      type: String,

      require: true,
    },
    session: {
      type: String,
    },
    lastDonatedDate: {
      type: Date,
    },
    studentId: {
      type: String,

      require: true,
      unique: true,
    },
    // district: { type: String, required: true },
    // subDistrict: { type: String, required: true },

    appId: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
