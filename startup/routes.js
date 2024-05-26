const express = require('express');
const mail = require('../routes/mail');
const cybergoat = require('../routes/cybergoat');
const error = require('../middleware/error');
const cors = require('cors');
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};


module.exports = function (app) {
    app.use(cors(corsOpts));

    app.use(express.json());
    app.use('/api/mail', mail);
    app.use('/api/cybergoat', cybergoat);
    app.use(error);
}