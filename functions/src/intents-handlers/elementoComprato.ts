import moment from 'moment'
import 'moment/locale/it'

moment.locale('it')

const elementoComprato = (conv:any, parameters:any) => {
    const stringed = JSON.stringify(parameters)
    const parsedParams = JSON.parse(stringed)
    let date = parsedParams.expDate
    let qty = parsedParams.quantity
    let any = parsedParams.any
    if(qty) {
        let quantity = `${qty.number} ${qty.udm}`
        console.log(quantity)
    }
    if (date) {
        let expDate
        if (typeof date == 'string') {
            expDate = moment(date).format('LL')
        }else{
            expDate = moment(date.date.startDate).format('LL')
        }
        console.log(expDate)
    }
    conv.ask(`Ok, ho aggiunto ${qty} di ${any} che scade il ${date}`)
}

export default elementoComprato