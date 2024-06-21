require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../Model/UserModel');

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
module.exports = [passport, isLoggedIn];