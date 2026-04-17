const Service = require("../models/service.model");
const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");
const { uploadOnCloudinary } = require("../config/cloudinary");

const getAllServices = asyncHandler(async (req, res) => {
  const { search, category, featured, active, limit } = req.query;
  const filter = {};

  if (category && category !== "All") {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  if (featured === "true") {
    filter.isFeatured = true;
  }

  if (active === "true") {
    filter.isActive = true;
  }

  let query = Service.find(filter).sort("-createdAt");
  
  if (limit) {
    query = query.limit(Number(limit));
  }

  const services = await query;

  return res
    .status(200)
    .json(new ApiResponse(200, services, "Services fetched successfully"));
});

const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.serviceId);
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service fetched successfully"));
});

const createService = asyncHandler(async (req, res) => {
  const { name, description, category } = req.body;

  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }

  const service = await Service.create({
    name,
    description,
    category: category || "other",
    createdBy: req.user._id,
    isActive: false,
    isFeatured: false,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, service, "Service created successfully as draft"));
});

const updateService = asyncHandler(async (req, res) => {
  const { 
    name, 
    description, 
    price, 
    isActive, 
    isFeatured, 
    category 
  } = req.body;

  // Handle arrays from FormData
  const tagsUpdate = req.body.tags || req.body['tags[]'];
  const whatItProvidesUpdate = req.body.whatItProvides || req.body['whatItProvides[]'];
  const featuresUpdate = req.body.features || req.body['features[]'];
  const technologiesUpdate = req.body.technologies || req.body['technologies[]'];
  const processUpdate = req.body.process || req.body['process[]'];
  const faqUpdate = req.body.faq || req.body['faq[]'];

  const updateData = { 
    name, 
    description, 
    price: price !== undefined ? Number(price) : undefined, 
    isActive: isActive !== undefined ? (isActive === "true" || isActive === true) : undefined,
    isFeatured: isFeatured !== undefined ? (isFeatured === "true" || isFeatured === true) : undefined,
    category,
    tags: tagsUpdate !== undefined ? (Array.isArray(tagsUpdate) ? tagsUpdate : (tagsUpdate ? [tagsUpdate] : [])) : undefined,
    whatItProvides: whatItProvidesUpdate !== undefined ? (Array.isArray(whatItProvidesUpdate) ? whatItProvidesUpdate : (whatItProvidesUpdate ? [whatItProvidesUpdate] : [])) : undefined,
    features: featuresUpdate !== undefined ? (Array.isArray(featuresUpdate) ? featuresUpdate : (featuresUpdate ? [featuresUpdate] : [])) : undefined,
    technologies: technologiesUpdate !== undefined ? (Array.isArray(technologiesUpdate) ? technologiesUpdate : (technologiesUpdate ? [technologiesUpdate] : [])) : undefined,
    process: processUpdate !== undefined ? (Array.isArray(processUpdate) ? processUpdate : (processUpdate ? [processUpdate] : [])) : undefined,
  };

  // Handle FAQ parsing if it comes as a stringified JSON or structured FormData
  if (faqUpdate) {
    try {
        updateData.faq = typeof faqUpdate === 'string' ? JSON.parse(faqUpdate) : faqUpdate;
    } catch (e) {
        console.error("Error parsing FAQ:", e);
    }
  }

  // Handle images
  if (req.files) {
    if (req.files.logo || req.files['logo']) {
      const logoLocalPath = (req.files.logo || req.files['logo'])[0].path;
      const logoUpload = await uploadOnCloudinary(logoLocalPath);
      if (logoUpload) updateData.logo = logoUpload.url;
    }
    if (req.files.coverImage || req.files['coverImage']) {
      const coverImageLocalPath = (req.files.coverImage || req.files['coverImage'])[0].path;
      const coverImageUpload = await uploadOnCloudinary(coverImageLocalPath);
      if (coverImageUpload) updateData.coverImage = coverImageUpload.url;
    }
  } else if (req.file) {
      // If only one file was uploaded via upload.single or similar
      const localPath = req.file.path;
      const upload = await uploadOnCloudinary(localPath);
      if (upload) {
          // You'd need to know which field this corresponds to. 
          // Defaulting to logo if we don't know, but better to use upload.fields
      }
  }

  // Remove undefined fields
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  const service = await Service.findByIdAndUpdate(
    req.params.serviceId,
    { $set: updateData },
    { new: true }
  );

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service updated successfully"));
});

const deleteService = asyncHandler(async (req, res) => {
  await Service.findByIdAndDelete(req.params.serviceId);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Service deleted successfully"));
});

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
