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

