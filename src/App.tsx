import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalContext from './components/GlobalContext';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import styled from 'styled-components';
function App() {
  // const {isDarkMode} = useContext({GlobalContext);
  return (
    <GlobalContext>
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
    </GlobalContext>
  );
}

export default App;

const Container = styled.div`
  background-color: hsl(0, 0%, 98%);
  & > header > nav, & > div {
    max-width: 90%;
    min-width: 90%;
    margin: auto;

    @media (min-width: 1281px) {
      max-width: 1240px;
      min-width: 1240px;
    }

    
  }
`;
