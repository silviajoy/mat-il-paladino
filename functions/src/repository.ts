import * as admin from 'firebase-admin';
import moment from 'moment'
let db:any

export const initializeDB = () => {
    admin.initializeApp();
    db = admin.firestore();
}

export const newDBElement = (pantryId:string, element:any) => {
    const foodRef = db.collection('pantries').doc(`${pantryId}`).collection('foods').doc(`${element.name}-${element.id}`)

    const setFood = foodRef.set(element)

    return setFood

}

export const getExpiringElements = (pantryId:string) => {
    let expElements:Array<any> = []
    const pantryRef = db.collection('pantries').doc(`${pantryId}`).collection('foods')
    
    return pantryRef.where('expDate', '==', moment().format('LL')).get()
    .then((snapshot:any) => {
        if(snapshot.empty) {
            return pantryRef.where('expDate', '==', moment().add(1, 'days').format('LL')).get()
            .then((snapshotIn:any) => {
                if(snapshotIn.empty) {
                    return []
                } 
                snapshotIn.forEach((doc:any) => {
                    expElements.push(doc.data())
                })
                return expElements
            })
        } 
        snapshot.forEach((doc:any) => {
            expElements.push(doc.data())
        })
        return expElements
    })
    
}

export const removeElement = (pantryId:string, elementName:string) => {
    const pantryRef = db.collection('pantries').doc(`${pantryId}`).collection('foods')
    return pantryRef.where('name', '==', elementName).get()
    .then((snapshot:any) => {
        console.log(snapshot)
        if(snapshot.empty) {
            return false
        }
        let promises:Array<Promise<any>> = []
        snapshot.forEach((doc:any)=>{
            promises.push(doc.ref.delete())
            
        })
        return Promise.all(promises).then(() => {
            return true
        })
    })
}

export const newUser = (user:any) => {
    const userRef = db.collection('users').doc(`${user.userId}`)
    const pantryRef = db.collection('pantries').doc(`${user.pantryId}`)

    pantryRef.set({pantryId: user.pantryId}).then(() => 'ok').catch((error:any) => error)
    
    const setUser = userRef.set({
        userId: user.userId,
        pantry: pantryRef
    })
    
    return setUser

}

