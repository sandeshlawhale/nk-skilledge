const User = require("../models/user.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");

const getAllUsers = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const filter = email && email.trim().length >= 2
    ? { email: { $regex: email.trim(), $options: "i" } }
    : {};
  const users = await User.find(filter).select("-password").limit(email ? 10 : undefined);
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});


const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { $set: { role } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Role updated successfully"));
});

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
};
