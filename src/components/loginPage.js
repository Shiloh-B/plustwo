import { useState, useEffect } from 'react';
import fire from '../fire';
import Login from './login';
import { useHistory } from 'react-router-dom';

function LoginPage() {

  const history = useHistory();
  const db = fire.firestore();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire.auth().signInWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
          setPasswordError(err.message);
          break;
        case "auth/user-disabled":
          setPasswordError(err.message);
          break;
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
      }
    });
  }

  const handleSignup = () => {
    clearErrors();
    fire.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log(fire.auth().currentUser.uid);
      db.collection('users').doc(email).set({
        email: email,
        username: username,
        uid: fire.auth().currentUser.uid,
        posts: []
      });
    })
    .catch(err => {
      switch(err.code) {
        case "auth/email-already-in-use":
          setEmailError('Email Already In Use');
          break;
        case "auth/invalid-email":
          setEmailError('Email Address Formatted Incorrectly');
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    });
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        setUser(user);
        history.push({
          pathname: '/plustwo',
          state: {
            email: user.email
          }
        });
        clearInputs();
      } else {
        setUser('');
      }
    });
  }

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div>
      <Login email={email} 
        setEmail={setEmail}
        username={username}
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword}
        handleLogin={handleLogin} 
        handleSignup={handleSignup} 
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError} />
    </div>
    
  );
}

export default LoginPage;