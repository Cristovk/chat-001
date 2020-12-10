import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

 firebase.initializeApp( {
  apiKey: "AIzaSyC0aP65s5jwGpFlO_4wxvg1oz5_y3fq1Gw",
  authDomain: "chat00001-420c9.firebaseapp.com",
  databaseURL: "https://chat00001-420c9.firebaseio.com",
  projectId: "chat00001-420c9",
  storageBucket: "chat00001-420c9.appspot.com",
  messagingSenderId: "392093388700",
  appId: "1:392093388700:web:b6e96785a44796d2fc8259"
});

const auth = firebase.auth();
const store = firebase.firestore();



function App() {

  const [user] = useAuthState(auth);


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
      
    <button className='sign-in' onClick={signInwithGoogle} > Registrate con Google </button>
    
    );
}


const SignOut = () => {
  return auth.currentUser && (
    <button className='sign.out' onClick={ () => auth.signOut() }> Sign Out </button>
  )

}


//chat

const ChatRoom = () => {
  const dummy = useRef();
  const messageRef = store.collection('message')
  const query = messageRef.orderBy('createdAt').limit(23);

  const[message] = useCollectionData(query, { idField: 'id'});

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser; 

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    dummy.current.scrollIntoView({behavior: 'smooth' });

  }

  return(
    <>
  <main>
    {message && message.map(msg => <ChatMessage key={msg.id} message={msg} /> ) }
    
    <span ref={dummy}></span>
    
  </main>

    <form onSubmit={sendMessage} >
    
    <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="explayate" />

    <button type="submit" disabled={!formValue}>👻</button>

    </form>
    </>
  )

  }

//construccion de mensaje

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}








export default App;
