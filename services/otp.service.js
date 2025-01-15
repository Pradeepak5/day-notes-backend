const nodeMailer = require("nodemailer");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const sendEmail = async (email, subject, text) => {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APP_PASSSWORD,
      },
    });

    // Multiple recipients are handled here
    const recipients = Array.isArray(email) ? email.join(",") : email;

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: recipients,
      subject,
      text
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent successfully');
      }
    });
}

module.exports = {
    sendEmail,
    generateOTP
}