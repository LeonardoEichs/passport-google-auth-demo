const express = require('express');
const session = require('express-session');
const passport = require('passport');

class App {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
        }));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
    }

    routes() {
        this.express.use(require('./routes/index'));    
    }
}

module.exports = new App().express;