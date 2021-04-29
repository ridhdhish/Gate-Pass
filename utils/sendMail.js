"use strict";
const nodemailer = require("nodemailer");

const main = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: "<sutofficialindia@gmail.com>", // sender address
      to: `${email}`, // list of receivers
      subject: "OTP", // Subject line
      text: `${otp}`, // plain text body
      html: `<b>OTP is here</b> <br> <h3>${otp}</h3>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { main };
