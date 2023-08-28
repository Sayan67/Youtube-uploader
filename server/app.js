const express = require('express');
const app = express();
const ejs = require('ejs');
//for google auth
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
//require('./conf/passport')(passport); //Need to change the path

//yoUTUBE API
const auth=require('./auth');
const OAuth2Data = require('./client_secret.json');
const {google} = require('googleapis');
var title,description;
var tags = [];

const port = process.env.PORT || 3000;
const path = require('path');
const mongoose = require('mongoose');
const UserModel = require('./models/users');
const { default: jwtDecode } = require('jwt-decode');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');


// //mongoDb connection with MongoDb atlas
mongoose.connect("<Your MongoDB instanse>").then(() => {

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
// app.get("/register",(req,res)=>{
//     if(console.error()){
//     res.end("Error loading page.")
//     }
//     else{res.render("signup_page");}
// });

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
    const tokenid=token;
    console.log(client);
    console.log("User logged in with token", token);
    res.redirect('/home')
  })
});

// const CLIENT_ID = OAuth2Data.installed.client_id;
// const CLIENT_SECRET = OAuth2Data.installed.client_secret;
// const REDIRECT_URL = OAuth2Data.installed.redirect_uris[0];
// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URL,
// );

// var authed = false;

// var scopes = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile";

// app.get('/YoutAPI',(req,res)=>{
//   if(!authed){
//     //generate a OAuth url
//     var url = oAuth2Client.generateAuthUrl({
//       access_type:"offline",
//       scope:scope,
//     })

//     res.render("")
//   }

//   res.render('/YutUpload')
// });


app.listen(port, () => {
  if (console.error()) { console.log("Error in server.") }
  else { console.log(`server runs perfectly on port ${port}`); }

});

module.exports = function (app) {
  console.log(app);
};
