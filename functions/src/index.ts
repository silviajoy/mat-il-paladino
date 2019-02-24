import * as functions from 'firebase-functions'
import { dialogflow } from 'actions-on-google'
import moment from 'moment'
import 'moment/locale/it'

moment.locale('it')

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true})

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('elementi comprati', (conv, parameters) => {
    let date = ''
    let qty = `${parameters.number} ${parameters.udm}`
    if(parameters.number == 1 && parameters.udm === 'porzioni') {
        qty = `${parameters.number} porzione`
    }
    if(parameters.date) {
        date = moment(parameters.date).format('LL')
    }
    conv.close(`Ok, ho aggiunto ${qty} di ${parameters.any} che scade il ${date}`)
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
