const Joi = require('joi');
const express = require('express');
const router = express.Router();
const path = require('path');
const {
    validateRequest
} = require('../models/mail');
const asyncHandler = require('../middleware/asyncHandler');
const nodemailer = require("nodemailer");

router.get('/', asyncHandler(async(req, res) => {
    res.sendFile(path.join(__dirname + '/mail.html'));
}));

router.post('/', asyncHandler(async(req, res) => {
    let request = req.body;
    delete request._id;
    const {
        error
    } = validateRequest(request);
    if (error) return res.status(400).send(error.details[0].message);


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'officemail.janardhan@gmail.com', // generated ethereal user
            pass: 'htzmxswupfutyyop', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `Consultation janardhan9701@gmail.com`, // sender address
        sender: 'test.janardhan@gmail.com', // sender address
        to: "janardhan9701@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...



    res.send('Success');
}));


module.exports = router;