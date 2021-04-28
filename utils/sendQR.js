"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const main = async (base64String, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let base64Image = base64String.split(";base64,").pop();
    fs.writeFile(
      path.join("uploads", "qr.png"),
      base64Image,
      { encoding: "base64" },
      function (err) {
        console.log("File created");
      }
    );

    const info = await transporter.sendMail({
      from: "<sutofficialindia@gmail.com>", // sender address
      to: `${email}`, // list of receivers
      subject: "QR code for Leave", // Subject line
      text: `Scan below code`, // plain text body
      html: `<img src="cid:unique@kreata.ee" alt="QRcode" />`, // html body
      attachments: [
        {
          filename: "qr.png",
          path: path.join("uploads", "qr.png"),
          cid: "unique@kreata.ee", //same cid value as in the html img src
        },
      ],
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    try {
      fs.unlinkSync(path.join("uploads", "qr.png"));
      //file removed
    } catch (err) {
      console.error(err);
    }

    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { main };
