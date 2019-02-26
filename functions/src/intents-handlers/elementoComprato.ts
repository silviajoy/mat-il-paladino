
import { newDBElement, newUser } from '../repository';
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import 'moment/locale/it'

moment.locale('it')

const generateUUID = () => {
    return uuidv4()
}

const elementoComprato = (conv:any, parameters:any) => {
    const stringed = JSON.stringify(parameters)
    const parsedParams = JSON.parse(stringed)

    if ('userId' in conv.user.storage) {
        //const userId = conv.user.storage.userId
        const pantryId = conv.user.storage.pantryId

        const expDateIn = parsedParams.expDate
        const quantityIn = parsedParams.quantity
        const anyIn = parsedParams.any

        const anyTerms = new RegExp('alla\sdispensa|ho\scomprato|ho\spreso|aggiungi|ho\sacquistato|metti\s|archivia|inserisci|ho\sfatto\sla\sspesa|\sscade|\sscadenza')

        let newPantryElement:any = {}
        let quantity:string = ''
        let expDateString:string = ''
        let expDate:Date
        


        //Gestisci l'arrivo di un elemento che non è un elemento
        if ( anyTerms.test(anyIn) || anyIn == '' ){
            console.log("any")
            console.log(anyIn)
            conv.ask(`Non ho capito, cosa hai comprato?`)
            return
        //L'elemento è ok, continua
        } else {
            //aggiorno l'oggetto con il nome dell'elemento
            newPantryElement.name = anyIn
            newPantryElement.id = generateUUID()
            //Se esiste il parametro quantity
            if(quantityIn && quantityIn !='') {
                //Se esiste il parametro number di quantity
                if(quantityIn.number && quantityIn.number != '') {
                    //aggiorno il valore di quantity locale
                    quantity += `${quantityIn.number} `
                }
                //Se esiste il parametro udm di quantity
                if(quantityIn.udm) {
                    //aggiorno il valore di quantity locale
                    quantity += `${quantityIn.udm}`
                }
                //aggiungo la quantità all'oggetto della dispensa
                newPantryElement.quantity = quantity            
            }
            //Se esiste il parametro expDate
            if (expDateIn && expDateIn != '' && expDateIn.date) {
                //Se il parametro date di expDate è una stringa, significa che è una data specifica
                if (typeof expDateIn.date == 'string') {
                    //aggiorno il valore di expDate locale
                    expDate = expDateIn.date
                    expDateString = moment(expDateIn.date).format('LL')
                //Altrimenti è un periodo
                }else{
                    //aggiorno il valore di expDate locale
                    expDate = expDateIn.date.startDate
                    expDateString = moment(expDateIn.date.startDate).format('LL')
                }
                //aggiungo la scadenza all'oggetto della dispensa
                newPantryElement.expDate = expDate
            }
            console.log(newPantryElement)
            console.log(expDateString)
            conv.ask(`Ok, poi?`)
            return (newDBElement(pantryId, newPantryElement))
            .then(()=>{
                conv.ask(`Ok, poi?`)
            }).catch((error:any) => {
                conv.close('mi spiace, c\'è stato un errore, riprova più tardi')
                return error
            })
            
        }
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

export default elementoComprato