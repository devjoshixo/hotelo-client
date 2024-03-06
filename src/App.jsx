import { useContext, useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './components/Login/Login';
import AuthContext from './context/AuthContext';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

function App() {
  const [hidden, setHidden] = useState(false);
  const ctx = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == '/account/login') {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [location]);

  return (
    <>
      {!hidden && <Navbar />}
      <Switch>
        <Route path='/' exact>
          <Homepage />
        </Route>
        <Route path='/account/login'>
          <Login />
        </Route>
      </Switch>
      {!hidden && <Footer />}
    </>
  );
}

export default App;
