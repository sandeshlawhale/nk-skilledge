const User = require("../models/user.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");

const getAllUsers = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const filter = email && email.trim().length >= 2
    ? { email: { $regex: email.trim(), $options: "i" } }
    : {};
  
  const pipeline = [
    { $match: filter },
    {
      $lookup: {
        from: "enrollments",
        localField: "_id",
        foreignField: "userId",
        as: "enrollments",
      },
    },
    {
      $addFields: {
        courseCount: { $size: "$enrollments" },
      },
    },
    {
      $project: {
        password: 0,
        enrollments: 0,
      },
    },
    { $sort: { createdAt: -1 } },
  ];

  if (email) {
    pipeline.push({ $limit: 10 });
  }

  const users = await User.aggregate(pipeline);

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
