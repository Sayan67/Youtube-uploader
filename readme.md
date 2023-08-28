## What is UTuberrr. ???
It is a platform for Youtubers to make their life easy.
But How?
-Suppose you're an Youtuber and you're having a huge number of audience. But for content creation you lead a very busy schedule. It is next to impossible for you to edit your own videos and post it using proper Title, Description, Tags etc on Youtube. So you hire a person to edit your videos and upload it in your youtube channel. But for that you need to give the access of your channel to that person. 
But isn't it too much risky??
Yes of course!! He can do whatever he wants to do with your channel.
## Here comes our platform UTuberrr.
Basically we provide a platform where you(Youtuber) and your service provider(Editor) where both can login. We(our server) will have the access of your Youtube channel(Which is safe by legal bounds). Now you do not need to give the access of your channel to your service provider(editor).
He can directly upload the video in your Youtube channel using Title, Tags, Description etc. through our website.
Our server will upload the video in your channel using YoutubeAPI.
So it's Safe!

## About us 💜
We are a platform that ensures security and facilitates access to one's YouTube channel that involves combining authentication, authorization, and management features to provide a secure and user-friendly experience for Youtube channel owners.

## Features 🖥️
1. We Provide secure upload, schedule, and manage video content in your Youtube channel directly from the platform by any service provider.            
2. Your channel credentials remain protected with us. The merchants don't get the access to those.  
3. The service provider choose,sets the thumbnail,Title, Description etc as per their words and uploads the video from our website to directly in your channel.


## Use ⚙️
Consumers dont need to invest themselves in uploading content,securing the internet,etc.Their merchants do it seamlessly for them that too without knowing their channel credentials!We provide you with that platform.

## Overview 📖
We are a platform that empowers YouTube channel owners with robust security measures and convenient access management tools. Whether you're a solo content creator or manage a team of collaborators, we provide a seamless and secure environment for managing your YouTube channel effectively.



## How to Run this project locally

1. Clone the project (How to clone👉)(https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)


2. Navigate to the cloned repository in your local system.

```bash
  cd <Project folder name>
```

3. Install dependencies

```bash
  npm install
```

4. Connect your mongoDb Database.
 i) Navigate to the server folder
ii) change '<Your MongoDB instanse>' part with your MongoDB
instanse.
For reference👉 https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/


5. Get your google client_id
For reference👉 https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid

6. Navigate to the file index.ejs in client/template/views/

7. Replace 'YOUR GOOGLE CLIENT_ID' in 8th line
with yoour google client_Id.

8. Start the server

 Navigate to the server folder.
```
    cd ../../../server
```
9. Start nodemon.
```bash
  nodemon app.js
```
10. Open anhy browser :
    in address bar type -> localhost:3000/home 
    and hit enter!

Congratulations you have done it!! 🎉



## Challenges 🛠️
Creating this website was not really easy for us.We faced quite a few complications in the process some of which are:

1. Creating a seameless responsive website that meets all the objectives was a rigourous job.
2. Using Google's OAuth2.0 for the feature #sign in with google was a hectic task for us. Generating client id, client secrets and keeping track of them and binding the code blocks in proper place was a no doubt tough job for us.
3. Connecting YoutubeAPIv3 and managing this complex backend server was the most difficult part though.

## Upcoming Modifications
1. We will properly integrate YoutubeAPI using token recieved through Google OAuth2.0.
2. We have planned for another layer for protection and security to our consumers(Youtuber). In due time,we are going to modify our platform in such a way such that the consumer get a option to approve the upload after the service provider(Video editor) uploads the video to our website. The consumer gets a pop up in his/her dashboard, where he/she can see the Video, Title, Description, Tags and make sure it is the desired video and infos are correct. Only then the video gets uploaded from our server.
  
## Tech Stack
HTML, CSS, Javascript, NodeJS, Xpress, hbs, ejs , MongoDB, MongoDB compass, MongoDB ATLAS, Youtube API, Google APIs.

## Contributors
1. Sayan Das 
2. Shinjini Bose

## Love from Kill-a-Byte team.❤️

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
