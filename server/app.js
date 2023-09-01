const express = require('express');
const app = express();
const ejs = require('ejs');
const cookieParser = require('cookie-parser')
//for google auth
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const yt = require('./yt')
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

const client = require('./clients')
const db = require('./db');
const TransactionModel = require('./models/TransactionModel');
const VidModel = require('./models/VidModel');


// //mongoDb connection with MongoDb atlas
const MONGO_URL = "mongodb+srv://Sayan67:iruqikmanded2@cluster0.it7p7iz.mongodb.net/YoutuberEditorCollab?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL).then(() => {

}).then(console.log(`Connection successful.`));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const static_path = path.join(__dirname, '../client');
const client_path = path.join(__dirname, '../client/templates/views');
app.use(express.static(client_path));
app.use(express.static(path.join(__dirname, "./videos")))
app.set("views", client_path);
app.set("view engine", "ejs");
app.use(cookieParser())

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
            user_type: 'consumer',
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

app.get('/upload/:id', (req, res) => {
  const uid = req.params.id
  db.fetchUserData(uid)
    .then(user => res.render('UPLOAD/upload', { user }))
    .catch(err => {
      res.status(500).send(err.toString())
    })
})

app.post('/upload/:id', upload.single('video'), (req, res) => {
  console.log(req.file)
  title = req.body.title;
  description = req.body.description;
  tags = req.body.tags

  const uid = req.params.id

  db.fetchUserData(uid)
    .then(user => {
      // Check if user exists.
      if (!user) {
        throw { code: 'UserNotFound' }
      }
      return user;
    })
    .then(user => {
      // Check if user is logged in
      if (!user.token)
        throw { code: 'UserNotLoggedIn' }
      return token
    })
    .then(token => {
      // Create a new client with the given token
      return client.fetchClient(req.params.id, token)
    })
    .then(client => {
      const youtube = google.youtube({
        version: 'v3',
        auth: client
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
          if (err) throw { code: 'YoutubeError', err }
          console.log("uploading done");
          res.redirect(`/upload/${uid}`)
        }
      )
    })
    .catch(err => {
      if (err.code == 'UserNotFound') {
        res.redirect(`404/usernotfound/${uid}`)
      } else if (err.code == 'UserNotLoggedIn') {
        res.status(400).send('User not logged in')
      } else {
        res.status(500).send('Internal error\n' + err.err.toString())
      }
    })

})

app.get('/profile/:id/txn/create', (req, res) => {
  const uid = req.params.id
  db.fetchUserData(uid)
    .then(user => {
      res.render('create/transaction/index', {user})
    })
    .catch(err => res.redirect('404/usernotfound/' + uid))
})

app.post('/profile/:id/txn/create', upload.single('video'), (req, res) => {
  const {path} = req.file
  db.fetchUserData(req.params.id)
  .then(user => {
    const model = new VidModel({
      path
    })
    model.save()
      .then((doc) => {
        new TransactionModel({
          name: req.body.name,
          description: req.body.description,
          consumer: user._id,
          consumer_vid: doc._id,
        })
        .save()
        .then(doc => {
          console.log(doc, user)
          user.transactions
            .push(doc._id)
          
          user.save()
            .then(() => {
              res.redirect(`/profile/${req.params.id}`)
            })
            .catch(err => res.status(500).send('1. failed ' + err.toString()))
        })
        .catch(err => res.status(500).send('2. failed ' + err.toString()))
      })
      .catch(err => res.status(500).send("3. failed " + err.toString()))
  })
})

app.get('404/usernotfound/:id', (req, res) => {
  res.send(
    "No user with the id " + req.params.id + " is present"
  )
})

app.get('/profile/:id', (req, res) => {
  const uid = req.params.id
  // Check if user is present 
  db.fetchPopulatedUserData(uid)
    .then(user => {
      res.render('profile/profile', {user, transactions: user.transactions})
    })
    .catch(err => res.redirect(`404/usernotfound/${uid}`));
})

app.get('/search', (req, res) => {
  const searchText = req.query.query || ''
  ConsumerModel.find()
    .exec()
    .then(docs => {
      const filtered = docs
      .filter(d => {
        return d.name.startsWith(searchText)
      })
      res.render('search/search', { entries: filtered, searchText })
    })
    .catch(err => res.status(500).send('Internal Server Error'))
})

app.get('/user/:id/listings', (req, res) => {
  const uid = req.params.id
  db.fetchPopulatedUserData(uid)
    .then(user => {
      const {transactions} = user
      res.render('listings/index', {transactions})
    }).catch(err => res.redirect('404/usernotfound/' + uid))
})

app.get('/apply/:tid', (req, res) => {
  const tid = req.params.tid
  res.render('UPLOAD/upload', {tid})
})

app.post('/apply/:tid', upload.single('video'), (req, res) => {
  const session = JSON.parse(req.cookies.session_data)
  console.log(session.uid)
  const uid = session.uid
  const tid = req.params.tid
  db.fetchUserData(uid)
    .then(user => {
      new VidModel({
        path: req.file.path
      }).save()
      .then(vid => {
        TransactionModel.findOne({_id: tid})
        .populate('consumer')
        .exec()
        .then((t) => {
          t.merchant = user._id
          t.merchant_vid = vid._id
          t.save()
            .then(() => {
              //Upload the file here.
              console.log(auth.getCredentials())
              console.log(t.consumer.token)
              yt.uploadVideo(client.fetchClient(t.consumer.uid, t.consumer.token), {
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
                path: vid.path
              })
                .then(() => res.redirect('/home'))
                .catch(err => res.status(500).send(JSON.stringify(err)))
            })
            .catch(err => res.status(500).send(err.toString()))
        })
      }).catch(err => res.status(500).send(err.toString()))
    }).catch(err => res.status(500).send(err.toString()))//res.redirect('/404/usernotfound/' + uid))
})


app.get('/video/download/:id', (req, res) => {
  req.params.id

  VidModel.findOne({_id: req.params.id})
  .exec()
  .then(v => {
    const {path} = v
    res.sendFile(path, {root: '.'})
  })
  .catch(err => res.status(404).send('404 User not found'))
})


app.listen(port, () => {
  if (console.error()) { console.log("Error in server.") }
  else { console.log(`server runs perfectly on port ${port}`); }

});

module.exports = function (app) {
  console.log(app);
};
