/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const booksCollection = admin.firestore().collection("books");
            const snapshot = await booksCollection.get();
            const count = snapshot.size;

            res.status(200).send({ count });
        } catch (error) {
            console.error("Error counting books: ", error.message);
            res.status(500).send("Error counting books");
        }
    });
})

exports.capitaliseData = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            console.log('aaaaaaaaaaaaaaaaaa')
            console.log(req)
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbb')
            console.log(req.body.text)
            const text = req.body.text
            // console.log(text)
            const updatedText = text.toUpperCase()
            // console.log(text)
            res.status(200).send({ updatedText })
        } catch (error) {
            console.error("Error changing case: ", error.message);
            res.status(500).send("Error changing case");
        }
    })
})
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
