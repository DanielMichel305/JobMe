require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

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
    let User = require('../Model/UserModel');
    try{
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    catch(err){
        res.json({error: "Error Creating account ",error_description: "Failiure to secure password", error_detail: err});
    }
    
    req.body.category == "client" ? req.body.category = false : req.body.category = true;
    req.body.gender == "male" ?  req.body.gender = false :  req.body.gender = true;
    try{
    await User.create({email: req.body.email, firstName: req.body.name, lastName: req.body.lastname, auth_Method: true, password: req.body.password, activated: false, phoneNumber: req.body.mobile, gender: req.body.gender});    
    }
    catch(err){
        res.json({error: "Error Creating account",error_description: "Failiure to add user", error_detail: err});
    }
    res.json({message: "Account Creation Success!"});
     
});

router.post('/signin', async (req, res) => {
    let UserModel = require('../Model/UserModel');
    user = await UserModel.findOne({email: req.body.email});
    if(user){
        console.log(user);
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            console.log(result);
            if(result == true){
                req.session.user = user;
                req.session.user.category == false ? res.redirect('/services') : res.redirect('/');
            }
            else{
                req.session.user = undefined;
                res.redirect('/login');
            }
        });
    }
    else{
        req.session.user = undefined;
        res.redirect('/login');
    }
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

