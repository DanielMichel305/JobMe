require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');

const multer = require('multer');
const fs = require('fs');
const path = require('path');



/*
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now())
    }
});

var upload = multer({storage: storage});
*/
const { default: mongoose } = require('mongoose');

const { UserController } = require('../Controller/AuthController');


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

router.get('/activate/:token', async (req,res)=>{
    

    UserController.activateUser(req,res);
    const activationScreen = await fs.readFileSync(path.join(__dirname,'../views/email_templates/mail-success.ejs'), 'utf8');
    console.log(`\n-------ACT SCREEN ------\n\n${activationScreen}\n\n----------------\n`);
  
    res.render('../email_templates/mail-success');
    return;

});

router.post('/signin', async (req, res) => {
    let UserModel = require('../Model/UserModel');
    user = await UserModel.findOne({email: req.body.email});
    if(user){
        //console.log(user);
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            //console.log(result);
            if(result == true){
                req.session.user = user;
                req.session.user.category ?  res.redirect('/') : res.redirect('/services')
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



router.post('/newGig', upload.single('image'), async (req, res) => {
    let UserModel = require('../Model/UserModel');
    let Gigs = require('../Model/gigModel');
    Gigs.create({gigDescription: req.body.title, price: req.body.price, date_posted: Date.now(), freelancer: req.session.user});
    for(let i = 0; i < Object.keys(req.body.files).length; i++){
        gig.imgs.push({data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.body.files[i].filename))});
    }
    try{
        user = User.findOne({email: req.session.user.email});
        user.gigs.push(gig);
        await gig.save();
        await user.save();
    }
    catch(err){
        res.json({error: "Error Creating account",error_description: "Failiure to add user", error_detail: err});
    }

});



module.exports = router;

