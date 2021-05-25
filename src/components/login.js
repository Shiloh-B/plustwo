import React from 'react';

function Login(props) {

  const { email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount,
  emailError, passwordError } = props;

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
      {hasAccount ? (
        <>
        <div className="button login-button" onClick={handleLogin}>Login</div>
        <p>Don't have an account?</p>
        <div className="button login-button" onClick={() => setHasAccount(!hasAccount)}>Sign Up</div>
        </>
      ) : (
        <>
        <div className="button login-button" onClick={handleSignup}>Sign Up</div>
        <p>Already have an account?</p>
        <div className="button login-button" onClick={() => setHasAccount(!hasAccount)}>Login</div>
        </>
      )}

      </div>
    </div>
  );
}

export default Login;