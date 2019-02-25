
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
        conv.user.storage = {}
    } else {
        userId = 'user-'+generateUUID();
        pantryId = 'pantry-'+generateUUID();
        console.log(userId)
        conv.user.storage.userId = userId
        const test = {
            userId: userId,
            pantryId: pantryId
        }
        console.log(newUser(test))
    }
    console.log(userId)
    console.log(conv.user.storage)

    

    conv.ask("Ciao! Cosa posso fare per te?")
}

export default welcomeIntent