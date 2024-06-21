require('dotenv').config();
const express = require('express');
const session = require('express-session')
const passport = require('passport');
const mongoose = require('mongoose');
const path = require("path");


const bcrypt = require("bcrypt");

const http = require('http');
const https = require('https');
const fs = require('fs');


require('./Model/dbScript');    ///Cron Job for confirming Hard Deletion into Hard Deletion


const app = express();
const port = 5000;
const bodyParser = require('body-parser')



app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


/* 
const privateKey = fs.readFileSync('./certs/key.pem', 'utf8');
const certificate = fs.readFileSync('./certs/cert.pem', 'utf8'); */

//const credentials = { key: privateKey, cert: certificate };



const authRouter = require('./Routes/authRoutes');


app.use(session({ secret: process.env.HTTPS_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname,'static')));
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');


mongoose.connect(process.env.MONGO_CONN_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));


app.use('/auth', authRouter);


function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}



app.get('/', (req, res) => {
  res.render("serviceproviderDash"); ///Change back to index
});

app.get("/services", (req, res) => {
  res.render("servicesPage");
});

app.get("/service-view", (req, res) => {
  res.render("serviceViewPage");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

/* app.post('/register', (req,res) => {

  var User = require('./Model/UserModel');
  bcrypt.genSalt(10,(err,salt) => {
    bcrypt.hash(req.body.password, salt , (err, hash) =>{
       if(err) throw (err);

       //console.log(hash);
       var user = new User({email: req.body.email, firstName: req.body.name, lastName: req.body.lastname, auth_Method: true, password: hash, activated: false});
       console.log(user);
       user.save().then(item =>{
         res.send("Information saved to database");
       })
       .catch(err =>{
         res.status(400).send("Unable to save to database");
       });     
    });
  });

}); */


app.get("/clientprofile", (req, res) => {
  res.render("clientprofile", req.session.user);
});
app.get("/clientpass", (req, res) => {
  res.render("clientpass");
});
app.get("/clienthistory", (req, res) => {
  res.render("clienthistory");
});



app.get("/poster", (req, res) => {

  res.render("poster");
});

app.get('/protected',isLoggedIn ,(req,res)=>{

  res.send("Protected Page");

})


/* const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
}); */


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});