import './App.css';
import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useState } from 'react';

const app = initializeApp(firebaseConfig);

function App() {

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    photo: '',
    email: '',
  })

  const provider = new GoogleAuthProvider();
  
  

  const handleGoogleSignIn = () => {


    const auth = getAuth();
    signInWithPopup(auth, provider)


      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { displayName, photoURL, email } = user
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          photo: photoURL,
          email: email
        }
        setUser(signedInUser)
        // console.log(user)
        console.log(signedInUser)

      })


      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

      });


  }

  const handleGoogleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',

      }
      setUser(signedOutUser)
    }).catch((error) => {
      // An error happened.
    });

  }

  const gitHubSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        const { displayName, photoURL, email } = user
        const gitHubUser = {
          name: displayName,
          photo: photoURL,
          email: email
        }

        setUser(gitHubUser);
        console.log(user);

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        console.log(errorMessage)
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });


  }

  return (
    <div className="App">


      {user.isSignedIn ?
        <button onClick={handleGoogleSignOut} style={{ marginTop: '150px', backgroundColor: "#7FFFD4", borderRadius: '4px' }}> Sign OUt </button> :
        <button onClick={handleGoogleSignIn} style={{ marginTop: '150px', backgroundColor: "#7FFFD4", borderRadius: '4px' }}> Sign in with Google </button>
      }
      <br />
      <button onClick={gitHubSignIn}>Sign in with Github</button>


      <br /><br />
      <img src={user.photo} alt="" />
      {
        user.isSignedIn ?
          <p> WELCOME , {user.name}</p> :
          <p>  {user.name}</p>

      }
      <p>{user.email}</p>

    </div>
  );
}

export default App;
