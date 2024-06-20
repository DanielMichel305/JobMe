require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser')

const GoogleStrategy = require('passport-google-oauth20').Strategy;

//const authController = require("../Controller/AuthController");
require("../Controller/AuthController");

router.get('/google',

    passport.authenticate('google', {scope : ['email','profile'] })

);
router.get('/google/callback',

    passport.authenticate( 'google', {          ///Change Redirect URL
        successRedirect: '/protected',
        failureRedirect: '/'
      })
);


router.post('/signup', async (req,res)=>{
    
    
    const UserController = require('../Controller/AuthController').UserController;
    await UserController.signUp(req,res);

});

router.get('/logout', (req, res,next) => {
    
   
    req.logout((err)=>{
        if(err) return next(err); else {
            req.session.destroy();
            res.redirect('/');
        }
    });
    
   
});


module.exports = router;

