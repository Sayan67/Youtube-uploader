const express = require('express');
const app = express();
const ejs = require('ejs');
//for google auth
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const path = require('path');
//require('./conf/passport')(passport); //Need to change the path
// var MongoClient = require('mongodb').MongoClient;  

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
const ConsumerModel = require('./models/ConsumerModel')
const { default: jwtDecode } = require('jwt-decode');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');


// //mongoDb connection with MongoDb atlas
const MONGO_URL = "mongodb+srv://Sayan67:iruqikmanded2@cluster0.it7p7iz.mongodb.net/YoutuberEditorCollab?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL).then(() => {

}).then(console.log(`Connection successful.`));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const static_path = path.join(__dirname, '../client');
const client_path = path.join(__dirname, '../client/templates/views');
app.use(express.static(client_path));
app.set("views", client_path);
app.set("view engine", "ejs");

app.get("/home", (_, res) => {
  if (console.error()) {
    res.end("Error loading page.")
  }
  else { res.render('index', { user: null }); }

});

app.get("/home/:uid", async (req, res) => {
  if (req.params.uid) {
    const uid = req.params.uid
    ConsumerModel.find({ uid }).exec()
      .then((docs) => {
        console.log(docs)
        if (docs.length == 0) {
          res.status(404).send("404 User Not Found !")
        }

        res.render('index', { user: docs[0] })
      }).catch(err => {
        res.status(400).send("Server error")
      })
  }
})

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

    auth.fetchUserInfo(auth.getGlobalClient(), (data) => {
      // Check if user exists

      console.log(data.id)

      ConsumerModel.find({ uid: data.id }).exec()
        .then((docs) => docs.length != 0)
        .then(exists => {
          // If the account already exists then
          // just redirect to the home page with
          // the uid.
          if (exists) {
            res.redirect(`/home/${data.id}`)
            return
          }

          // Only create a new account if an account with the 
          // given google account does not exist.
          const model = new ConsumerModel({
            uid: data.id,
            name: data.name,
            email: data.email,
            picture: data.picture,
            token: token.access_token,
          });

          model.save()
            .then(() => res.redirect(`/home/${data.id}`))
            .catch(err =>
              res.status(400).send('Failed to create user !: ' + err.toString())
            );
        })
        .catch(err => {
          res.status(400).send("Server error")
        })



    })
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

      part: "snippet,status",

      media: {
        body: fs.createReadStream(req.file.path)
      }
    },
    (err, data) => {
      if (err) throw err
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
