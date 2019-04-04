const functions = require('firebase-functions');

const express = require('express'),
    admin = require('firebase-admin'),
    cors = require("cors");

const app = express();

app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert({
        /* Your Firebase SDK config */
    }),
    databaseURL: "" /* Your Firebase database URL */
});

const db = admin.firestore();

const getDate = () => {
    const date = new Date();

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

app.get("/orders", (req, res) => {
    const ordersRef = db.collection("days").doc(getDate()).collection("orders");

    ordersRef.get()
        .then((snapshot) => {
            if (snapshot.empty) {
                res.status(200).send([]);
            } else {
                let result = [];

                snapshot.forEach(document => {
                    result.push(document.data());
                })

                res.status(200).send(result);
            }
        })
        .catch(error => {
            console.error(error);

            res.status(500).send("You have work to do!");
        })
})

app.post("/order", (req, res) => {
    const newDocument = db.collection("days").doc(getDate()).collection("orders").doc();

    newDocument.set(req.body);

    res.status(200).send("Added!");
})


exports.app = functions.https.onRequest(app);