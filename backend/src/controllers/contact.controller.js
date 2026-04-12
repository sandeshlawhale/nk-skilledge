const { ApiError, ApiResponse, asyncHandler } = require("../utils/apiHandler");
const { sendContactMail } = require("../utils/resend.js");

/**
 * Handle contact form submission.
 * Validates the fields and sends an email.
 */
const handleContactFormSubmission = asyncHandler(async (req, res) => {
  const { name, email, subject, message, toEmail } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "All fields (name, email, subject, message) are required");
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please provide a valid email address");
  }

  try {
    const emailResponse = await sendContactMail({ name, email, subject, message, toEmail });

    if (emailResponse.error) {
      console.error("Resend API Error details:", emailResponse.error);
      throw new ApiError(500, `Failed to send email: ${emailResponse.error.message || "Unknown error"}`);
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Your message has been sent successfully!"));
  } catch (error) {
    console.error("Contact Form Controller Error:", error);
    throw new ApiError(500, error.message || "Something went wrong while sending your message");
  }
});

module.exports = {
  handleContactFormSubmission,
};
