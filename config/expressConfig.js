const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const router = require('./router');
const authInit = require('../init/auth');
const initStorage = require('../init/storage');

module.exports = async (app) => {
    app.engine('hbs', hbs({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');
    app.use(express.static('static'));
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(await authInit());
    app.use(await initStorage());

    app.use(router)
}