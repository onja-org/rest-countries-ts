import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import { useContext } from 'react';
import {GlobalContext} from './components/GlobalContext';
import Header from './components/Header';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import {Container} from './globalStyles';

function App() {
  const {theme} = useContext(GlobalContext);
  return (
  <ThemeProvider theme={theme}>
    <Container>
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
    </Container>
  </ThemeProvider>
  );
}
export default App;


