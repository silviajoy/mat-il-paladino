import * as admin from 'firebase-admin';
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

