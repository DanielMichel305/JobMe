require('dotenv').config();
const passport = require('passport');
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const util = require('util');
const path = require('path');
const ejs = require("ejs");

const fs = require('fs');
const readFile = util.promisify(fs.readFile);



const User = require('../Model/UserModel');
const UserAuth = require('../Model/UserAuthModel');


const NodeEmail = process.env.verification_Email;
const NodePass = process.env.email_passkey;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: NodeEmail,
    pass: NodePass  
  }
});

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true,
  },
  async function(request, accessToken, refreshToken, profile, done) {

    console.log(`\n----------\n${profile.emails[0].value}\n${profile.name.givenName}\n${profile.name.familyName}\n${profile._json.locale}\n-------------\n`);
   
    let user = await User.findOne({email: profile.emails[0].value});
    if(user){
      done(null, user)
    }
    else{
      user = new User({email: profile.emails[0].value ,firstName:profile.name.givenName, lastName: profile.name.familyName, auth_Method: false, activated: true});      //Activated since he signed in using Google(trusted sika)
      await user.save(); 
      console.log(`Added user using Oauth2.0\n ${profile.id} ${profile} \n\n--\n`);
      done(null, user);
    } 

    

    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

const UserController = {

    async generateActivationToken(reqEmail){
      const result =  {
        success: true,
        Activationtoken: ""
      }
      const activationToken =   crypto.randomBytes(10).toString('hex');
      console.log(`\n----------ACTIVATION TOKEN ${activationToken}\n-------------\n`);
      result.Activationtoken =activationToken;
      try{
        await UserAuth.create({email: reqEmail, Activation_TOKEN: activationToken});
      }
      catch(err){
        result.success = false
        result.token="";  
      }
      return result;
    },

    async sendActivationMail(email,token){

      let emailContent = await readFile(path.join(__dirname,'../views/email_templates/verification.ejs'), 'utf8');
      console.log(`ACTIVATION TOKEN ${token}\n`);
      const activationLink = { 
        ActivationLink : `http://localhost:5000/auth/activate/${token}`
      };
      emailContent = ejs.render(emailContent, activationLink);
      console.log(emailContent);

      const mailOptions = {
        from: process.env.verification_Email,
        to: email,
        subject: 'Account Verification',
        html: emailContent       ////////////////////////////Load using fs from ../views/email_templates/verification.html
      };

      try {
        transporter.sendMail(mailOptions);
        console.error('Verification email sent');
        //res.send('Verification email sent');
      } catch (error) {
        console.error('Error sending verification email:', error);
        ////Send ERROr
      }
      

    },

    async signUp(req,res){

      const response = {
        message : ""
      }
      try{
        if(!await User.findOne({email : req.body.email})){
          //User Already exists
          response.message = "Email associated with another account, Try to sign in.";
          res.json(400)(response);
          return;
        }
      }
      catch(err){
        response.message="Couldn't Signup, Server ERROR";
        res.json(500)({response});
        return;

      }
      
      
      const token = await this.generateActivationToken(req.body.email);
      req.body.category == "client" ? req.body.category = false : req.body.category = true;
      req.body.gender == "male" ?  req.body.gender = false :  req.body.gender = true;
  
      try{
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      }
      catch(err){
          if(err)res.json({error: "Error Creating account ",error_description: "Failiure to secure password", error_detail: err});
          return
      }
      
      try{
      await User.create({email: req.body.email, firstName: req.body.name, lastName: req.body.lastname, auth_Method: true, password: req.body.password, activated: false, phoneNumber: req.body.mobile});    
      }
      catch(err){
          if(err) res.json({error: "Error Creating account",error_description: "Failiure to add user", error_detail: err});
          return
      }

      this.sendActivationMail(req.body.email, token.Activationtoken);

      res.json({message: "Account Creation Success!"});
  },

  async activateUser(req,res){
    const {token} = req.params;
    try{
      const userEmail = await UserAuth.findOne({Activation_TOKEN : token }, 'email');
      await UserAuth.deleteOne({Activation_TOKEN: token, email : userEmail.email});
      await User.findOneAndUpdate({email : userEmail.email}, {activated: true});
    }
    catch(err){
      console.log(err);
    }
    res.send("Account aactivated!");
  }

}

module.exports = {passport, isLoggedIn, UserController};