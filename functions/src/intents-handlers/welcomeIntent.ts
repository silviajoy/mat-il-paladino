
import { newUser } from '../repository';
import uuidv4 from 'uuid/v4'

const generateUUID = () => {
    return uuidv4()
}

const welcomeIntent = (conv:any, parameters:any) => {
    let userId
    let pantryId

    if ('userId' in conv.user.storage) {
        userId = conv.user.storage.userId;
        conv.ask("Ciao! Cosa posso fare per te?")
        //conv.user.storage = {}
    } else {
        userId = 'user-'+generateUUID();
        pantryId = 'pantry-'+generateUUID();
        conv.user.storage.userId = userId
        conv.user.storage.pantryId = pantryId
        const user = {
            userId: userId,
            pantryId: pantryId
        }
        return newUser(user).then(()=>{
            conv.ask("La tua dispensa virtuale è pronta! Possiamo iniziare aggiungendo elementi. Puoi dirmi cosa hai in dispensa e quando scade. Un elemento alla volta.")        
        }).catch((error:any) => error)
    }

    

    
}

export default welcomeIntent