const express = require('express');
const path = require("path");
const app = express();
const port = 3000;



app.use(express.static(path.join(__dirname,'static')));
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');


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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});