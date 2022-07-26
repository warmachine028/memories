    updated: Thursday, 21st July 2022

<div align=center>
    <a href="https://memories-pritam.netlify.app/">
        <img width=200 src="assets/icon.png" alt="Memories">
    </a>
    <p style="font-family: roboto, calibri; font-size:12pt; font-style:italic"> Cherishing the past with love </p>
    <a href="https://app.netlify.com/sites/memories-pritam/deploys">
    <img src="https://api.netlify.com/api/v1/badges/db24b02d-0b1f-4b4a-a07c-fe3b8318abe7/deploy-status" alt="Netlify Status">
    </a>
</div>

# [Memories](https://memories-pritam.netlify.app)

## What's new?

- Added Remember Me and Forgot Password in UI 
- Improved UI By adding Hover animations on post cards and Media 🖼️🌟
- Added Custom Snakbar Alerts from Material UI replacing Basic browser Alerts 💕💕
- Instant Post Update: Now Post Updations take 0 time.
- Fixed CSS for Post, Post Details and Cards for overflowing Text.
- Fixed DeleteComment functionality.
- Fixed noNewUpdates error in userUpdate.
- Seperated CommentSection into new seperate component

## Table of Contents

- [Introduction](#introduction)
- [Acknowledgement](#acknowledgement)
- [Additional Improvements](#additional-improvements)
- [Tech Stack Used](#tech-stack-used)
- [Previews](#previews)
- [Demo](#demo)
- [License](#license)

---

## Introduction

- In earlier days people used to maintain diaries.
- But those days have changed, but our needs still remain the same.
- This is a WebApp helps suffice the need for a digital diary and help improve the user Experience.
- The Anime [Kimi no Na wa](https://en.wikipedia.org/wiki/Your_Name) gave me inspiration to improve this project every bit.

---

## Acknowledgement

- Thanks to JS Mastery for this wonderful tutorial.
- I have added more refined features on top of this project.

---

## Additional Improvements

- Minimalist Look, Translucent Card Type Posts
- CRUD based Operations, Post Search Functionality with Tags
- Details Page of each Post Card, Recommended Posts
- Image Compression (compresses every image under 1MB)
- Like - Comment - Tag functionality and 2 Way Authentication (JWT Token & Google OAuth)
- Randomised Custom User Avatar
- Image Drag and Drop functionality in Preview while creation
- Private Post and Comment Deletion Functionality
- Attention to detail features like comment circular progress, custom Private button gives it the wow factor
- Post Owners and commenters can regulate comments in their posts.
- While deleting comment TrashCan icon turns CircularProgress.
- Comments section only visible if at least 1 comment exist in a post.
- Custom user detail page including newly written dataBase query and Backend Logic.
- Custom Posts Liked by user Component.
- Customised comment containers with User avatar and post times.
- Clickable Chips and Custom Tabs in UserDetails page.
- Memories is now a Progressive Web App 🎉🎉🎊🎊.
- Added Credential Update Feature for users.

## Tech Stack Used

- Material UI: Styling & Icons
- MongoDB: For DataBase Management
- ExpressJs: For BackEnd Routing
- React: FrontEnd Developement
- NodeJS: For BackEnd developement
- Netlify: For hosting the frontEnd developement
- Vercel: For hosting the frontent production
- Heroku: Hosting the backEnd

![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white) ![Mongo DB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
---

## Previews

- Desktop Preview

![Desktop-Preview](assets/desktop-preview.png)

- Mobile Preview

![Mobile-Preview](assets/mobile-preview.png)

- User Details:

![UserDetails](assets/userDetails.png)

- Comment:

![Comments](assets/comment.png)

- Credential Update:

![Credential Update](assets/userUpdate.webp)

- SnackBar Alerts

![SnackBar Alerts](assets/snackBar.png)

- Remember Me and Forgot Password

![Remember Me](assets/remember%20me.png)

---

## Demo

![Customizations](assets/demo.gif)

---

## Upcomming

- Migrating from OAuth 1.0 to OAuth 2.0 to avoid deprication
- Implement Remember Me Feature in Authentication

---

## License

- see [LICENSE]

**Pritam, 2022**

[license]: https://github.com/warmachine028/memories/blob/main/LICENSE
