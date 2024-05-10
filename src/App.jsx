import { useContext, useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AuthContext from './context/AuthContext';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import HoteloLoader from './components/UI/HoteloLoader';
import HotelPage from './pages/HotelPage';

function App() {
  const [hidden, setHidden] = useState(false);
  const [loader, setLoader] = useState(true);
  const ctx = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    setLoader(true);
    window.scrollTo(0, 0);
    if (location.pathname == '/account/login') {
      setHidden(true);
    } else {
      setHidden(false);
    }
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* {loader && <HoteloLoader />} */}
      {!hidden && <Navbar />}
      <Switch>
        <Route path='/' exact>
          <Homepage />
        </Route>
        <Route path='/search'>
          <SearchPage />
        </Route>
        <Route path='/account/login'>
          <LoginPage />
        </Route>
        <Route path='/hotel/:id'>
          <HotelPage />
        </Route>
      </Switch>
      {!hidden && <Footer />}
    </>
  );
}

export default App;
