const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Utility to send contact form emails using Resend.
 * @param {Object} details - The contact form details.
 * @param {string} details.name - The sender's name.
 * @param {string} details.email - The sender's email.
 * @param {string} details.subject - The subject of the message.
 * @param {string} details.message - The message content.
 * @returns {Promise<Object>} The Resend API response.
 */
const sendContactMail = async ({ name, email, subject, message }) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // Default for testing; update after domain verification
      to: "contact@nkskilledge.com", // Recipient email
      subject: `[Contact Form] ${subject} from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #0f172a;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">This message was sent from the NK SkillEdge contact form.</p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error("Resend Email Error:", error);
    throw error;
  }
};

module.exports = { sendContactMail };
