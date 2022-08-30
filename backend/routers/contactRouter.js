const express = require("express");
const contactRouter = express.Router();
const nodemailer = require("nodemailer");
// Ansluter nodemailer till företagets email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
// Verifierar att anslutningen fungerar / inte fungerar
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
// POST som skickar information från kontaktformulär till företagets e-mail
contactRouter.post("/send", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const subject = "New contact request from " + name;
  console.log(name);
  console.log(email);
  console.log(message);
  // Information från kontaktformuläret samt e-mailuppbyggnad
  const mail = {
    from: name,
    subject: subject,
    to: "matadresturang@gmail.com",
    html: `<p><b>Message:</b><br> ${message} </p> <br> <p>Sent by ${name}, reply to ${email}</p>`,
    replyTo: email,
  };
  // Verifierar att mailet skickats / inte skickats
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
