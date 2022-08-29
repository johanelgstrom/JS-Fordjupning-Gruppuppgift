const express = require("express");
const contactRouter = express.Router();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

contactRouter.post("/send", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const subject = "New contact request from " + name;
  console.log(name);
  console.log(email);
  console.log(message);

  const mail = {
    from: name,
    subject: subject,
    to: "matadresturang@gmail.com",
    html: `<p><b>Message:</b><br> ${message} </p> <br> <p>Sent by ${name}, reply to ${email}</p>`,
    replyTo: email,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

module.exports = contactRouter;
