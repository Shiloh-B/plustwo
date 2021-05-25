import React from 'react';

function Login(props) {

  const { email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount,
  emailError, passwordError, username, setUsername } = props;

  if(hasAccount) {
    return (
      <div className="login-container">
        <h1 className="login-header">Plus <span>Two</span></h1>
        <div className="input-container">
          <label>Email</label>
          <input type="text" className="username" autoFocus required value={email} 
          onChange={e => setEmail(e.target.value)}></input>
          <p className="error-message">{emailError}</p>
          <label>Password</label>
          <input type="password" className="password" required value={password}
          onChange={e => setPassword(e.target.value)}></input>
          <p className="error-message">{passwordError}</p>
        </div>
        <div className="submition-container">
          <div className="button login-button" onClick={handleLogin}>Login</div>
          <p>Don't have an account?</p>
          <div className="button login-button" onClick={() => setHasAccount(!hasAccount)}>Sign Up</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="login-container">
        <h1 className="login-header">Plus <span>Two</span></h1>
        <div className="input-container">
          <label>Email</label>
          <input type="text" className="username" autoFocus required value={email} 
          onChange={e => setEmail(e.target.value)}></input>
          <p className="error-message">{emailError}</p>
          <label>Username</label>
          <input type="text" className="username" autoFocus required value={username} 
          onChange={e => setUsername(e.target.value)}></input>
          <p className="error-message">{emailError}</p>
          <label>Password</label>
          <input type="password" className="password" required value={password}
          onChange={e => setPassword(e.target.value)}></input>
          <p className="error-message">{passwordError}</p>
        </div>
        <div className="submition-container">
          <div className="button login-button" onClick={handleSignup}>Sign Up</div>
          <p>Already have an account?</p>
          <div className="button login-button" onClick={() => setHasAccount(!hasAccount)}>Login</div>
        </div>
      </div>
    );
  }
  
}

export default Login;