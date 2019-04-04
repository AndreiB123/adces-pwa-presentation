# From 0 to PWA

## About
2 Hours Workshop about PWA + Live demo

Developend a food order progressive web application, deployed on Firebase.

### technologies
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
In index.js you need to add your Firebase SDK and the "firebase use <project_id>" command in order to use 
the functions module, with your application.

[React]: <https://reactjs.org>
[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
[Firebase]: <https://firebase.google.com>
[Bootstrap]: <https://getbootstrap.com>
