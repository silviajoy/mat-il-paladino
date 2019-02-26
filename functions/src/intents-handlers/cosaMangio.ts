
import { getExpiringElements, newUser } from '../repository';
import uuidv4 from 'uuid/v4'
import moment = require('moment');


const generateUUID = () => {
    return uuidv4()
}

const cosaMangio = (conv:any, parameters:any) => {
    //const stringed = JSON.stringify(parameters)
    //const parsedParams = JSON.parse(stringed)

    if ('userId' in conv.user.storage) {
        //const userId = conv.user.storage.userId
        const pantryId = conv.user.storage.pantryId
        return getExpiringElements(pantryId).then((expiring:Array<any>) => {
            if(expiring.length == 0) {
                conv.ask("Non hai niente in scadenza nei prossimi oggi o domani")
            } else {
                let expDate = expiring[0].expDate
                expDate = moment(expDate).calendar().split('alle')[0].toLowerCase()
                let speech = `In scadenza ${expDate}hai `
                expiring.forEach((obj:any) => {
                    speech += `${obj.quantity} di ${obj.name} `
                })
                conv.ask(speech)
            }
        })
        
        
            
    } else {
        const userId = 'user-'+generateUUID();
        const pantryId = 'pantry-'+generateUUID();
        conv.user.storage.userId = userId
        conv.user.storage.pantryId = pantryId
        const user = {
            userId: userId,
            pantryId: pantryId
        }
        return newUser(user).then(()=>{
            conv.ask("La tua dispensa virtuale è pronta! Possiamo iniziare aggiungendo elementi. Dimmi pure cosa hai in dispensa e quando scade. Un elemento alla volta.")        
        }).catch((error:any) => error)
    }
}

export default cosaMangio