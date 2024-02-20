import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/'>
          <Homepage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
