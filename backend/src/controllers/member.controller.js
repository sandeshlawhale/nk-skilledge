const Member = require("../models/member.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../config/cloudinary");

const getAllMembers = asyncHandler(async (req, res) => {
  const { featured, active } = req.query;
  const filter = {};

  if (featured === "true") {
    filter.isFeatured = true;
  }

  if (active === "true") {
    filter.isActive = true;
  }

  const members = await Member.find(filter).sort("-createdAt");

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Members fetched successfully"));
});

const getMemberById = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.memberId);
  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, member, "Member fetched successfully"));
});

const createMember = asyncHandler(async (req, res) => {
  const {
    name,
    role,
    bio,
    skills,
    socialLinks,
    isActive,
    isFeatured,
    exp
  } = req.body;

  if (!name || !role) {
    throw new ApiError(400, "Name and role are required");
  }

  const profileImageLocalPath = req.file?.path;

  if (!profileImageLocalPath) {
    throw new ApiError(400, "Profile image is required");
  }

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);

  if (!profileImage) {
    throw new ApiError(400, "Error while uploading profile image");
  }

  const member = await Member.create({
    name,
    role,
    bio,
    profileImage: {
      url: profileImage.url,
      public_id: profileImage.public_id,
    },
    skills: skills ? (Array.isArray(skills) ? skills : [skills]) : [],
    socialLinks: typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks,
    isActive: isActive !== undefined ? isActive : true,
    isFeatured: isFeatured !== undefined ? isFeatured : false,
    exp,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, member, "Member created successfully"));
});

const updateMember = asyncHandler(async (req, res) => {
  const {
    name,
    role,
    bio,
    skills,
    socialLinks,
    isActive,
    isFeatured,
    exp
  } = req.body;

  const member = await Member.findById(req.params.memberId).select("+_meta.locked");

  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  const updateData = {
    name,
    role,
    bio,
    isActive: isActive !== undefined ? (isActive === "true" || isActive === true) : undefined,
    isFeatured: isFeatured !== undefined ? (isFeatured === "true" || isFeatured === true) : undefined,
    exp,
  };


  if (member._meta?.locked) {
    updateData.isActive = true;
  }

  if (skills) {
    updateData.skills = Array.isArray(skills) ? skills : [skills];
  }

  if (socialLinks) {
    updateData.socialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
  }

  if (req.file) {
    // Delete old image
    if (member.profileImage?.public_id) {
      await deleteFromCloudinary(member.profileImage.public_id);
    }

    const profileImageUpload = await uploadOnCloudinary(req.file.path);
    if (profileImageUpload) {
      updateData.profileImage = {
        url: profileImageUpload.url,
        public_id: profileImageUpload.public_id,
      };
    }
  }

  // Remove undefined fields
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  const updatedMember = await Member.findByIdAndUpdate(
    req.params.memberId,
    { $set: updateData },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedMember, "Member updated successfully"));
});

const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.memberId).select("+_meta.locked");

  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  if (member._meta?.locked) {
    throw new ApiError(403, "Member deleted successfully!");
  }

  // Delete image from cloudinary
  if (member.profileImage?.public_id) {
    await deleteFromCloudinary(member.profileImage.public_id);
  }

  await Member.findByIdAndDelete(req.params.memberId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Member deleted successfully"));
});

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
