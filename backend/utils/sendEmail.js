// nodemailer is a free, open-source library that allows you to easily send emails from your Node.js application.
// npm i nodemailer
import nodemailer from "nodemailer";

// This function sends an email using nodemailer
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    // properties specify the SMTP (Simple Mail Transfer Protocol) server to connect to.
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Praveen <praveenuppar718@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;

// nodemailer is designed around the concept of "transporters."
// A transporter is an object that handles the actual sending of the email.
