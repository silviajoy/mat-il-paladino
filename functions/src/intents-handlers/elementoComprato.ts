
import { newDBElement } from '../repository';
import uuidv1 from 'uuid/v1'
import moment from 'moment'
import 'moment/locale/it'

moment.locale('it')

const generateUUID = () => {
    return uuidv1()
}

const elementoComprato = (conv:any, parameters:any) => {
    let userId

    if ('userId' in conv.user.storage) {
        userId = conv.user.storage.userId;
    } else {
        // generateUUID is your function to generate ids.
        userId = generateUUID();
        console.log(userId)
        conv.user.storage.userId = userId
    }
    console.log(conv.user.storage)

    const test = {
        userId: conv.user._id,
    }
    console.log(newDBElement(test))

    const stringed = JSON.stringify(parameters)
    const parsedParams = JSON.parse(stringed)
    const anyTerms = new RegExp('ho comprato|ho preso|aggiungi|ho acquistato|metti|archivia|ho fatto la spesa|\sscade|\sscadenza')
    let quantity = ''
    let expDate = ''
    let date = parsedParams.expDate
    let qty = parsedParams.quantity
    let any = parsedParams.any
    if ( anyTerms.test(any) || any =='' ){
        console.log("any")
        conv.ask(`Non ho capito, cosa hai comprato?`)
    } else {
        if(qty) {
            if(qty.number) {
                quantity += `${qty.number} `
            }
            if(qty.udm) {
                quantity += `${qty.udm}`
            }
            console.log(quantity)
        }
        if (date) {
            if (typeof date == 'string') {
                expDate = moment(date).format('LL')
            }else{
                expDate = moment(date.date.startDate).format('LL')
            }
            console.log(expDate)
        }
        conv.ask(`Ok, ho aggiunto ${quantity} di ${any} che scade il ${expDate}`)
    }
}

export default elementoComprato