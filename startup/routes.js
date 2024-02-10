const express = require('express');
const mail = require('../routes/mail');
const error = require('../middleware/error');

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
    app.use(error);
}