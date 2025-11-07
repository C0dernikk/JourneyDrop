const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: (process.env.SMTP_SECURE || 'false') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

async function sendEmail({ to, subject, html }) {
  const transporter = createTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  return transporter.sendMail({ from, to, subject, html });
}

function passwordResetTemplate(resetUrl, name = 'there') {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2>Password reset request</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the button below to choose a new password. This link will expire in 1 hour.</p>
      <p>
        <a href="${resetUrl}" style="display:inline-block;padding:10px 16px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:6px">Reset Password</a>
      </p>
      <p>Or copy and paste this URL into your browser:<br />${resetUrl}</p>
      <p>If you didn't request a password reset, you can safely ignore this email.</p>
    </div>
  `;
}

function emailVerificationTemplate(verifyUrl, name = 'there') {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2>Verify your email</h2>
      <p>Hi ${name},</p>
      <p>Thanks for signing up! Please verify your email to complete your registration.</p>
      <p>
        <a href="${verifyUrl}" style="display:inline-block;padding:10px 16px;background:#10b981;color:#ffffff;text-decoration:none;border-radius:6px">Verify Email</a>
      </p>
      <p>Or copy and paste this URL into your browser:<br />${verifyUrl}</p>
    </div>
  `;
}

module.exports = {
  sendEmail,
  passwordResetTemplate,
  emailVerificationTemplate,
};


