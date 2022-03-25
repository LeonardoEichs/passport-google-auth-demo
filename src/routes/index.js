const routes = require('express').Router();
const passport = require('passport');
require('../middlewares/auth')

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.status(401).json({ message: 'Unauthorized' });
}

routes.get('/', (req,res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
})

routes.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        hostedDomain: 'gmail.com',
        prompt: 'select_account'
    }
));

routes.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    }
));

routes.get('/auth/failure', (req,res) => {
    res.send('Authentication failed');
})

routes.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

routes.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}, you are authenticated`);
})

routes.get('/hello', (req, res) => {
    res.send('Hello World');
} )

module.exports = routes;