require('dotenv').config();
const express = require('express');
const session = require('express-session')
const passport = require('passport');
const mongoose = require('mongoose');
const path = require("path");
const http = require('http');
const https = require('https');
const fs = require('fs');

require('./Model/dbScript');    ///Cron Job for confirming Hard Deletion into Hard Deletion

const app = express();
const port = 80;
const bodyParser = require('body-parser')

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 


/*
const privateKey = fs.readFileSync('./certs/key.pem', 'utf8');
const certificate = fs.readFileSync('./certs/cert.pem', 'utf8'); */

//const credentials = { key: privateKey, cert: certificate };


const authRouter = require('./Routes/authRoutes');


app.use(session({ secret: process.env.HTTPS_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname,'static')));
app.set('views', path.join(__dirname, 'views/pages'));  /// add / pages 
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

app.get("/payment", (req, res) => {
  res.render("payment");
});

app.get('/verification', (req,res)=>{

  const activationLink = {ActivationLink : "afbw"}
  res.render("verification", activationLink);

})

/* const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
}); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});