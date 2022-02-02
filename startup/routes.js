const express = require('express');
const mail = require('../routes/mail');
const error = require('../middleware/error');
const CORS = require('../middleware/cors');


module.exports = function(app) {
    app.use(CORS);
    app.use(express.json());
    app.use('/api/mail', mail);
    app.use(error);
}