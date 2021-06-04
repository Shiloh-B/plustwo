import LoginPage from './components/loginPage';
import Main from './components/main';
import AccountPage from './components/accountPage';
import Error from './components/errorComponent';
import { BrowserRouter as Browser, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Browser>
        <Switch>
          <Route path="/" exact component={LoginPage}></Route>
          <Route path="/plustwo" exact component={Main}></Route>
          <Route path="/plustwo/:username/:uid" exact component={AccountPage}></Route>
          <Route component={Error}></Route>
        </Switch>
      </Browser>
    </div>
  );
}

export default App;
