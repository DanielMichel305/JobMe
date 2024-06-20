require('dotenv').config();
const passport = require('passport');
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

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
        token: ""
      }
      const activationToken = crypto.randomBytes(10).toString('hex');
      result.token =activationToken;
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

      const mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'Account Verification',
        text: `Click the following link to verify your account: http://localhost:8080/activateAccount/${token}`
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

      this.sendActivationMail(req.body.email, token.token);

      res.json({message: "Account Creation Success!"});
  }

}

module.exports = {passport, isLoggedIn, UserController};