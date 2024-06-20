const express = require('express');
const session = require('express-session')
const passport = require('passport');
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const port = 5000;

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


app.get("/clientprofile", (req, res) => {
  res.render("clientprofile");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});