const mongoose = require("mongoose");

const serviceInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    projectDetails: {
      type: String,
    },
    budget: {
      type: String,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceInquiry", serviceInquirySchema);
