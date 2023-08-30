const express = require('express');
const app = express();
const ejs = require('ejs');
//for google auth
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const path = require('path');
//require('./conf/passport')(passport); //Need to change the path

//yoUTUBE API
const auth = require('./auth');
const OAuth2Data = require('./client_secret.json');
const { google } = require('googleapis');
var title, description;
var tags = [];
const multer = require('multer');
const fs = require('fs');

const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const UserModel = require('./models/users');
const { default: jwtDecode } = require('jwt-decode');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');


// //mongoDb connection with MongoDb atlas
mongoose.connect("mongodb+srv://Sayan67:iruqikmanded2@cluster0.it7p7iz.mongodb.net/YoutuberEditorCollab?retryWrites=true&w=majority").then(() => {

}).then(console.log(`Connection successful.`));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const static_path = path.join(__dirname, '../client');
const client_path = path.join(__dirname, '../client/templates/views');
app.use(express.static(client_path));
app.set("views", client_path);
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  if (console.error()) {
    res.end("Error loading page.")
  }
  else { res.render('index'); }

});

//create new user
app.post("/register", async (req, res) => {
  try {
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const registered = await newUser.save();
    res.status(201).render('index');

  } catch (error) {
    res.status(400).send(error);
  }

});

app.post("/auth/callback", (req, res) => {
  let data = jwtDecode(req.body.credential);
  console.log(data);
  res.redirect('/home');
});

//Sign in 
app.get("/signin", (_, res) => {
  const url = auth.getAuthUrl(auth.getGlobalClient())
  res.redirect(url)
});

app.get("/", async (req, res) => {
  auth.handleAuthCode(auth.getGlobalClient(), req.query.code, (client, token) => {
    var userinfo = jwtDecode(token.id_token);
    console.log(userinfo);
    const tokenid = token;
    console.log(client);
    console.log("User logged in with token", token);

    auth.fetchUserInfo(auth.getGlobalClient())
    res.redirect('/home')
  })
});


//multer library
var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./videos");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
  },
});

var upload = multer({
  storage: Storage,
})

app.post('/upload', upload.single('video'), (req, res) => {
    console.log(req.file)
    title = req.body.title;
    description = req.body.description;
    tags = req.body.tags

    const youtube = google.youtube({
      version: 'v3',
      auth: auth.getGlobalClient()
    })

    youtube.videos.insert(
      {
        resource: {
          snippet: {
            title: title,
            description: description,
            tags: tags
          },
          status: {
            privacyStatus: "private"
          },
        },

        part:"snippet,status",

        media: {
          body: fs.createReadStream(req.file.path)
        }
      },
      (err,data)=>{
        if(err) throw err
        console.log("uploading done");
        res.render("index")
      }
    )

})

app.listen(port, () => {
  if (console.error()) { console.log("Error in server.") }
  else { console.log(`server runs perfectly on port ${port}`); }

});

module.exports = function (app) {
  console.log(app);
};
