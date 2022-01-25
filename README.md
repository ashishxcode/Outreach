[![LinkedIn][linkedin-shield]][linkedin-url]
[![Twitter][twitter-shield]][twitter-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://ibb.co/8xL0DTG"><img src="https://i.ibb.co/R6k9pZt/Outreach-cover.png" alt="Outreach Logo" border="0"></a>
  <hr>
  <p align="center">
   A MERN Stack Social Media App for Developer Community
    <br />
    <a href="https://github.com/ashishxcode/Outreach"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://theoutreach.herokuapp.com/">🌎 Website </a> 
    |
    <a href="https://github.com/ashishxcode/Outreach">👩🏻‍💻 Code</a>
  </p>
</p>

<!-- TABLE OF CONTENTS --><details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      About The Project
      <ul>
        <li>Built With</li>
      </ul>
    </li>
    <li>
     Getting Started
      <ul>
        <li>Prerequisites</li>
        <li>Installation</li>
      </ul>
    </li>
    <li>Contributing</li>
    <li>License</li>
    <li>Contact</li>
    <li>Acknowledgements</li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

<span style="font-size:30px">🚧</span> 
# About The Project
As a developer networking is matter. Why it's matter ?

- We work in teams
- We share our work
- We share our exprerience

and we do many things where networking is important and <strong>Outreach</strong> is providing platform for meeting new people around the world

The main aim for building this app was to learn <strong>MERN</strong> stack

<span style="font-size:30px">⚒️</span>

# Built With

This project use morden techonology for web development.

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

<span style="font-size:30px">🚀</span>

# Getting Started

## Prerequisites

This app is using MERN Stack so for getting started with this code you need some basic knowledge

- ES 6 Concept
- React Components
- React Hooks
- Node JS
- Express JS
- MongoDB

## Installation

Add a default.json file in config folder with the following

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```

### Test production before deploy

After running a build in the client 👆, cd into the root of the project.  
And run...

Linux/Unix

```bash
NODE_ENV=production node server.js
```

Windows Cmd Prompt or Powershell

```bash
$env:NODE_ENV="production"
node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)

<!-- CONTRIBUTING -->

<span style="font-size:30px">⚓</span>

# Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

<span style="font-size:30px">✅</span>

# License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

<span style="font-size:30px">💌</span>

# Contact

Ashish Patel - [@ashishxcode](https://twitter.com/ashishxcode) - ashishxcode@gmail.com

Project Link: [https://github.com/ashishxcode/Outreach](https://github.com/ashishxcode/Outreach)

<!-- ACKNOWLEDGEMENTS -->

<span style="font-size:30px">✔️</span>

# Acknowledgements

- [Axios](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Express](https://www.npmjs.com/package/express)
- [Gravatar](https://www.npmjs.com/package/gravatar)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [React-icons](https://www.npmjs.com/package/react-icons)
- [Normalize-url](https://www.npmjs.com/package/normalize-url)
- [Moment](https://www.npmjs.com/package/moment)
- [Redux](https://www.npmjs.com/package/redux)
- [Redux-thunk](https://www.npmjs.com/package/redux-thunk)
- [UUID](https://www.npmjs.com/package/uuid)
- [MongoDB](https://www.mongodb.com/)
- [Heroku](https://www.heroku.com/)
- [Shields](https://shields.io)

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ashishxcode
[twitter-shield]: https://img.shields.io/badge/-Twitter-black.svg?style=for-the-badge&logo=twitter&colorB=555
[twitter-url]: twitter.com/ashishxcode
