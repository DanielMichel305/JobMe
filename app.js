const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.render("servicesPage");
});


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});