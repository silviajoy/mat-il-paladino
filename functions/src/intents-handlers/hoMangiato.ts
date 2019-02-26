
import { newUser, removeElement } from '../repository';
import uuidv4 from 'uuid/v4'


const generateUUID = () => {
    return uuidv4()
}

const hoMangiato = (conv:any, parameters:any) => {
    const stringed = JSON.stringify(parameters)
    const parsedParams = JSON.parse(stringed)

    if ('userId' in conv.user.storage) {
        //const userId = conv.user.storage.userId
        const pantryId = conv.user.storage.pantryId
        const elementName = parsedParams.any
        const keyword = parsedParams.removeKeywords
        if(keyword == 'ho usato') {
            console.log("in here")
        }
        if(keyword == 'ho finito') {
            return removeElement(pantryId, elementName)
            .then((result:boolean) =>  {
                console.log(result)
                if(result){
                    conv.ask(`Ok, ho rimosso ${elementName} dalla tua dispensa. Posso fare altro?`)
                } else {
                    conv.ask(`Non sembra esserci nessun elemento chiamato ${elementName} nella tua dispensa. Posso fare altro per te?`)
                }
            })
        }
        
        conv.ask('Non ho capito bene, puoi ripetere?')
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

export default hoMangiato