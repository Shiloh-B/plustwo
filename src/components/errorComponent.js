import React, { useEffect, useState } from 'react';
import Nav from '../components/nav';
import BottomNav from '../components/bottomNav';
import fire from '../fire';
import { useHistory } from 'react-router-dom';

function Error() {

  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((user) => {
      if(user) {
        setEmail(user.email);
      } else {
        history.push('/');
      }
    });

    return(() => unsubscribe());
  }, [history])

  return (
    <div className="content-body">
      <div className="content">
      <Nav />
        <div className="error-container">
          <h1>Oops!<br></br>We couldn't find anything here.<br></br>You can either head home or log back in!</h1>  
        </div>
      </div>
      <BottomNav route={'Home'} email={email}/>
    </div>
  )
}

export default Error;