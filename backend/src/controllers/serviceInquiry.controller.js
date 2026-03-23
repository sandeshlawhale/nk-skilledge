const ServiceInquiry = require("../models/serviceInquiry.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");

const createInquiry = asyncHandler(async (req, res) => {
  const inquiry = await ServiceInquiry.create(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, inquiry, "Inquiry submitted successfully"));
});

const getAllInquiries = asyncHandler(async (req, res) => {
  const inquiries = await ServiceInquiry.find();
  return res
    .status(200)
    .json(new ApiResponse(200, inquiries, "Inquiries fetched successfully"));
});

const deleteInquiry = asyncHandler(async (req, res) => {
  await ServiceInquiry.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Inquiry deleted successfully"));
});

module.exports = {
  createInquiry,
  getAllInquiries,
  deleteInquiry,
};
