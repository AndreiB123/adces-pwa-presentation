# From 0 to PWA

## About
2 Hours Workshop about Rapid Prototyping and PWA + Live demo

Developed a food order progressive web application, deployed on Firebase.

### Technologies
* [React] - A JavaScript library for building user interfaces
* [Bootstrap] - esponsive, mobile-first projects on the web
* [Firebase] - One platform, with products that work better together
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework

## How to use it

Install server dependencies
```sh
$ cd functions
$ npm install
```

Install client dependencies and build
```sh
$ cd client
$ npm install
$ npm run-script build
```

Serve locally
```sh
$ firebase serve
```

## Deployed app

https://ixia-le-lunch.firebaseapp.com/

#### Observation
There are some additional steps in order to bind your firebase application:
- in index.js you need to add your Firebase SDK
- run "firebase use <project_id>" command in order to use the functions module, with your application.
- add the configurations in the App.js file in order to use push notifications

[React]: <https://reactjs.org>
[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
[Firebase]: <https://firebase.google.com>
[Bootstrap]: <https://getbootstrap.com>
