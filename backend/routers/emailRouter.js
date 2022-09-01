const express = require("express");
const emailRouter = express.Router();
const nodemailer = require("nodemailer");
const BookingModel = require("../models/BookingModel.js");
const CustomerModel = require("../models/CustomerModel.js");
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

emailRouter.post("/getBookingId", async (req, res) => {
  // Hittar först kunden
  let customer = await CustomerModel.findOne({
    name: req.body.name,
    email: req.body.email,
  });
  // Hittar sedan bokningen med hjälp av kundens ID
  let booking = await BookingModel.findOne({
    customer: customer._id,
    date: req.body.date,
    seating: req.body.seating,
  });
  // Skickar tillbaka bokningsnumret
  res.send(booking._id.valueOf());
});

// POST som skickar information från kontaktformulär till företagets e-mail
emailRouter.post("/sendThanks", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const subject = "New contact request from " + name;
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
// POST för emailutskick av bokningsbekräftelse
emailRouter.post("/bookConfirm", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const date = req.body.date;
  const seating = req.body.seating;
  const personAmount = req.body.personAmount;
  const id = req.body.id;
  let newPersonAmount = "";
  // Om antal personer i bokningen är 1 används "person", om fler så används "personer"
  if (parseInt(personAmount) === 1) {
    newPersonAmount = "person";
  } else {
    newPersonAmount = "personer";
  }
  // Mall för email
  const mail = {
    from: "Resturang Matad",
    subject: "Bokningsbekräftelse hos Matad - " + date + " " + seating,
    to: email,
    html: `<p>Hej ${name},</p><p>Detta är en bekräftelse hos oss på Matad den ${date} kl. ${seating} för ${personAmount} ${newPersonAmount}.</p><p>För att avboka, klicka på knappen nedan.</p><a href="http://localhost:3000/cancel/${id}"><button>Avboka</button></a> <br> <p>Varmt välkommen,</p><p>Resturang Matad</p>`,
  };
  // Skickar samt kontrollerar mail
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

emailRouter.post("/bookCancel", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const date = req.body.date;
  const seating = req.body.seating;
  const personAmount = req.body.personAmount;

  // Om antal personer i bokningen är 1 används "person", om fler så används "personer"
  if (parseInt(personAmount) === 1) {
    newPersonAmount = "person";
  } else {
    newPersonAmount = "personer";
  }
  // Mall för email
  const mail = {
    from: "Resturang Matad",
    subject: "Avbokningsbekräftelse hos Matad - " + date + " " + seating,
    to: email,
    html: `<p>Hej ${name},</p><p>Detta är en bekräftelse på din avbokning hos oss på Matad den ${date} kl. ${seating} för ${personAmount} ${newPersonAmount}.</p><p>Varmt välkommen att boka hos oss igen,</p><p>Resturang Matad</p>`,
  };
  // Skickar samt kontrollerar mail
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

module.exports = emailRouter;
