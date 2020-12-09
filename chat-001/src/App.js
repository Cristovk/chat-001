import React from 'react';
import './App.css';

import firebase from'firebase/app';
import 'firebase/fireStore';
import 'firebase/auth';

import{useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

  firebase.initializeApp = {
  apiKey: "AIzaSyC0aP65s5jwGpFlO_4wxvg1oz5_y3fq1Gw",
  authDomain: "chat00001-420c9.firebaseapp.com",
  databaseURL: "https://chat00001-420c9.firebaseio.com",
  projectId: "chat00001-420c9",
  storageBucket: "chat00001-420c9.appspot.com",
  messagingSenderId: "392093388700",
  appId: "1:392093388700:web:b6e96785a44796d2fc8259"
};

export const auth = firebase.auth();
export const store = firebase.firestore();



function App() {

 const [user] = useAuthState(auth)


  return (
    <div className="App">
      <header className="App-header">
          <h1>🍔⚛️🔥💬</h1>
          <SignOut/>
      </header>

      <section>
        { user ? <ChatRoom/> : <SignIn/> }
      </section>

    </div>
  );
}

const SignIn = ()  => {

  const signInwithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
      <>
    <button className='sign-in' onClick={signInwithGoogle} > Registrate con Google </button>
    <p> "Sea cortés, ande con cuidado, edúquese lo mas que pueda, respete para que lo respeten...Y que Dios nos ampare" </p>
  </>
    
    );
}


const SignOut = () => {
  return auth.currentUser && (
    <button className='sign.out' onClick={ () => auth.signOut() }> Sign Out </button>
  )

}









export default App;
