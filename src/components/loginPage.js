import { useState, useEffect } from 'react';
import fire from '../fire';
import Login from './login';
import Main from './main';

function LoginPage() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
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

  const handleLogout = () => {
    clearErrors();
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        clearInputs();
        setUser(user);
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
      {user ? (
        <Main handleLogout={handleLogout} />
      ) : (
        <Login email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword}
        handleLogin={handleLogin} 
        handleSignup={handleSignup} 
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError} />
      )}
    </div>
    
  );
}

export default LoginPage;