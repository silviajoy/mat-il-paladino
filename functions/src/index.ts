import * as functions from 'firebase-functions';
import { dialogflow } from 'actions-on-google';

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('favorite color', (conv, {color}) => {
  const luckyNumber = color.length;
  const output = `<speak>Il tuo numero fortunato è... ${luckyNumber}!</speak>`;
    conv.close(output)
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
