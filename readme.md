<h1 align="center">UTuberrr </h1>

<div align="center">
 <p>

[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)
![Visitors](https://api.visitorbadge.io/api/visitors?path=Sayan67%2FYoutube-uploader%20&countColor=%23263759&style=flat)
![GitHub forks](https://img.shields.io/github/forks/Sayan67/Youtube-uploader)
![GitHub Repo stars](https://img.shields.io/github/stars/Sayan67/Youtube-uploader)
![GitHub contributors](https://img.shields.io/github/contributors/Sayan67/Youtube-uploader)
![GitHub last commit](https://img.shields.io/github/last-commit/Sayan67/Youtube-uploader)
![GitHub repo size](https://img.shields.io/github/repo-size/Sayan67/Youtube-uploader)
![Github](https://img.shields.io/github/license/Sayan67/Youtube-uploader)
![GitHub issues](https://img.shields.io/github/issues/Sayan67/Youtube-uploader)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/Sayan67/Youtube-uploader)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Sayan67/Youtube-uploader)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/Sayan67/Youtube-uploader)

 </p>
 </div>



## What is UTuberrr. ?

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
<div align="center">
<img src="https://github.com/Sayan67/Youtube-uploader/assets/94789182/6942cea1-c488-458f-806c-a9f3a306ab71" width="60%"></div>
<br>
<div align="center">
<img src="https://github.com/Sayan67/Youtube-uploader/assets/94789182/4b00eed3-bf02-46b4-87c6-ed7511b2ee59" width="60%"></div>
<br>
<div align="center">
<img src="https://github.com/Sayan67/Youtube-uploader/assets/94789182/eaf82fbb-8764-4281-945b-7f43eeb32c2c" width="60%"></div>

## About us 💜
We are a platform that ensures security and facilitates access to one's YouTube channel that involves combining authentication, authorization, and management features to provide a secure and user-friendly experience for Youtube channel owners.

## Features 🖥️
1. We Provide secure upload, schedule, and manage video content in your Youtube channel directly from the platform by any service provider.            
2. Your channel credentials remain protected with us. The merchants don't get the access to those.  
3. The service provider choose,sets the thumbnail,Title, Description etc as per their words and uploads the video from our website to directly in your channel.
4. One you Sign up your sign in credentials will be stored in our database.
5. After that you can sign in with google easily.

<div align="center">
<img src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png" width="50%"></div>


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
   ii) Replace the part 'Your MongoDB instance' part with your MongoDB instance.
       For reference👉 https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/


5. Get your google client_id. 
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
2. Using Google's OAuth2.0 for the feature #sign in with google was a hectic task for us. Generating client id, client secrets and keeping track of them and binding the code blocks in proper place was a no     doubt tough job for us.
3. Connecting YoutubeAPIv3 and managing this complex backend server was the most difficult part though.

## Upcoming Modifications to be added:
- [x] 1. We will properly integrate YoutubeAPI using token recieved through Google OAuth2.0. 
- [ ] 2. We have planned for another layer for protection and security to our consumers(Youtuber). In due time,we are going to modify our platform in such a way such that the consumer get a option to approve         the upload after the service provider(Video editor) uploads the video to our website. The consumer gets a pop up in his/her dashboard, where he/she can see the Video, Title, Description, Tags and            make sure it is the desired video and infos are correct. Only then the video gets uploaded from our server.
- [ ] 3. Improve UI and UX
- [ ] 4. Different UI for Clients and freelancer 
  
## Tech Stack
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white) ![Windows 11](https://img.shields.io/badge/Windows%2011-%230079d5.svg?style=for-the-badge&logo=Windows%2011&logoColor=white)

![Google](https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) 




## How to Contribute

- Take a look at the Existing [Issues] or create your own!
- Fork the Repo and create a Branch for any Issue that you are working upon.
- Create a Pull Request which will be promptly reviewed and suggestions would be added to improve it.
- Add Screenshots to help us know what this is all about.

## How to make a Pull Request

**1.** Fork the repository by clicking on the Fork symbol at the top right corner.

**2.** Clone the forked repository.

```
   git clone https://github.com/<Your name>/Youtube-uploader.git
```

**3.** Navigate to the project directory.

```
   cd Youtube-uploader
```

**4.** Create a new branch:

```
   git checkout -b YourBranchName
```

**5.** Make changes in source code.

**6.** Stage your changes and commit

```
   git add .
   git commit -m "<your_commit_message>"
```

**7.** Push your local commits to the remote repo.

```
   git push origin YourBranchName
```

**8.** Create a [PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)

**Note** If anyone contributes to this repository, then the changes will not be reflected in your local repository. For that:

**9.** Setup a reference(remote) to the original repository to get all the changes from the remote.

```
   git remote add upstream https://github.com/<Your name>/Youtube-uploader.git
```

**10.** Check the remotes for this repository.

```
   git remote -v
```

**11.** Fetching from the remote repository will bring in its branches and their respective commits.

```
   git fetch upstream
```

**12.** Make sure that you're on your master branch.

```
   git checkout master
```

**13.** Now that we have fetched the upstream repository, we want to merge its changes into our local branch. This will bring that branch into sync with the upstream, without losing our local changes.

```
   git merge upstream/master
```

Work in Progress pull requests are also welcome to get feedback early on, or if there is something blocking you from working further.

## Contributors ✨

Thanks goes to these wonderful people 💜
<table>
  <tr>
    <td align="center"><a href="https://github.com/Sayan67"><img src="https://avatars.githubusercontent.com/u/94789182?v=4" width="100px;" alt=""/><br /><sub><b>Sayan Das</b></sub></a><br /><a href="#maintenance-Tlazypanda" title="Maintenance">🚧✍️🖥️</a></td>
    <td align="center"><a href="https://github.com/shinjini-bose"><img src="https://avatars.githubusercontent.com/u/115457915?v=4" width="100px;" alt=""/><br /><sub><b>shinjini-bose</b></sub></a><br /><a title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/soumit-s"><img src="https://avatars.githubusercontent.com/u/89582406?v=4" width="100px;" alt=""/><br /><sub><b>Soumit Srimany</b></sub></a><br /><a  title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/arghadipmanna101"><img src="https://avatars.githubusercontent.com/u/130065095?v=4" width="100px;" alt=""/><br /><sub><b>Arghadip Manna</b></sub></a><br /> <a  title="Code">💻</a></td>
  </tr>
  </table>


## Love from Kill-a-Byte team.❤️

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
