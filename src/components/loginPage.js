import { useState, useEffect } from 'react';
import fire from '../fire';
import Login from './login';
import { useHistory } from 'react-router-dom';
import Filter from 'bad-words';

function LoginPage() {

  const history = useHistory();
  const db = fire.firestore();
  const filter = new Filter();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
    setUsername('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire.auth().signInWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
          setEmailError(err.message);
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
          default:
            break;
      }
    });
  }

  const handleSignup = () => {
    clearErrors();
    if(filter.isProfane(username)) {
      setUsernameError('You need to pick a new username.');
      return;
    }
    fire.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      res.user.updateProfile({
        displayName: username
      }).catch((err) => {
        console.log(err);
      });

      db.collection('users').doc(email).set({
        email: email,
        username: username,
        uid: fire.auth().currentUser.uid
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
        default:
          break;
      }
    });
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        setUser(user);
        history.push({
          pathname: '/plustwo'
        });
        clearInputs();
      } else {
        setUser('');
      }
    });
  }

  const keyDownSignupHandler = (e) => {
    if(e.key === 'Enter') {
      handleSignup();
    }
  }

  const keyDownSigninHandler = (e) => {
    if(e.key === 'Enter') {
      handleLogin();
    }
  }

  const forgotPasswordHandler = () => {
    fire.auth().sendPasswordResetEmail(email).then(() => {
      alert('We\'ve sent a password reset link to your email!');
    }).catch((err) => {
      setEmailError('Please enter your email into the email box so we may send a recovery link.');
      console.log(err);
    });
    clearInputs();
    clearErrors();
  }

  useEffect(() => {
    authListener();
    return(() => authListener());
  }, [authListener]);

  return (
    <div>
      <Login email={email} 
        setEmail={setEmail}
        username={username}
        setUsername={setUsername} 
        usernameError={usernameError}
        password={password} 
        setPassword={setPassword}
        handleLogin={handleLogin} 
        handleSignup={handleSignup} 
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        clearErrors={clearErrors}
        clearInputs={clearInputs}
        keyDownSigninHandler={keyDownSigninHandler}
        keyDownSignupHandler={keyDownSignupHandler}
        forgotPasswordHandler={forgotPasswordHandler} />
    </div>
    
  );
}

export default LoginPage;