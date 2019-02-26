import * as admin from 'firebase-admin';


export const initializeDB = () => {
    admin.initializeApp();
    const db = admin.firestore();
    console.log(db)
}

export const newDBElement = (element:any) => {
    const db = admin.firestore();
    const docRef = db.collection('users').doc(`${element.userId}`);
    
    return docRef

}

export const newUser = (user:any) => {
    const db = admin.firestore();
    const userRef = db.collection('users').doc(`${user.userId}`);
    const pantryRef = db.collection('pantries').doc(`${user.pantryId}`);

    pantryRef.set({pantryId: user.pantryId}).then(() => 'ok').catch((error) => error)
    
    const setUser = userRef.set({
        userId: user.userId,
        pantry: pantryRef
    })
    
    return setUser

}

