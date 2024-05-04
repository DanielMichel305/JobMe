const express = require('express');
const path = require("path");
const app = express();
const port = 3001;

app.get("/service-view", (req, res) => {
  res.render("serviceViewPage");
});



app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname,'static')));
app.set('views', path.join(__dirname, 'views/pages'));
//app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
  res.render("index");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});