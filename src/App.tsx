import React, {useContext} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalContext from './components/GlobalContext';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';

function App() {
  // const {isDarkMode} = useContext({GlobalContext);
  return (
    <GlobalContext>
      <div className="App">
          <Header/>
          <Router>
            <Switch>
              <Route exact path="/">
                  <Home/>
                </Route>
                <Route path="/:alpha3Code">
                  <CountryDetails/>
              </Route>
            </Switch>
          </Router>
      </div>
    </GlobalContext>
  );
}

export default App;
