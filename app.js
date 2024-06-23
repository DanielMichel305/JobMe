require('dotenv').config();
const express = require('express');
const session = require('express-session')
const passport = require('passport');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require("path");
const http = require('http');
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

require('./Model/dbScript');    ///Cron Job for confirming Hard Deletion into Hard Deletion

const app = express();
const port = 80;
const bodyParser = require('body-parser')

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 

const wss = new WebSocket.Server({ server });

// WebSocket server setup
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

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
app.use('/auth', authRouter);

 const conn = mongoose.createConnection(process.env.MONGO_CONN_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

  let gfs;
  conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  });
  
 
  const storage = new GridFsStorage({
    url: process.env.MONGO_CONN_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  const upload = multer({ storage });



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

/* const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
}); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});