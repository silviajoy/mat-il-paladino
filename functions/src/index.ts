import * as functions from 'firebase-functions'
import { initializeDB } from './repository'
import { dialogflow } from 'actions-on-google'
import elementoComprato from './intents-handlers/elementoComprato'
import welcomeIntent from './intents-handlers/welcomeIntent';

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true})

export default initializeDB
initializeDB()


// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('elemento comprato', elementoComprato);

app.intent('welcome intent', welcomeIntent);

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
