const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.render("servicesPage");
});

app.get("/service-view", (req, res) => {
  res.render("serviceViewPage");
});


app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});