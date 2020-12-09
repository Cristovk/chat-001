const functions = require('firebase-functions');
const Filter = require('bad-words');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.detectEvilUsers = functions.firestore.document('messages/{msId}')
                            .onCreate(async, (doc, ctx ) => {

                                const filter = new filter();
                                const { text, uid } = doc.data();
                                   
                             if(filter.isProfane(text)){
                                 const cleanned = filter.clean(text)
                                 await db.doc.update({text:`🤐 Te vas Banneado por decir:  ${cleanned}`});

                                 await db.collection('banned').doc(uid).set({});
                             }   

                             const userRef = db.collection('users').doc(uid)

                             const userData = (await userRef.get().data());

                             if(userData.msCount >= 7){
                                 await db.collection('banned').doc(uid).set({});

                             }else{
                                 await userRef.set({ msCount: (userData.msCount || 0) + 1 })
                             }


                            })
