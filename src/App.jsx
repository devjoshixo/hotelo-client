import { useState } from 'react';

import Navbar from './components/Navbar/Navbar';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/'>
          <Homepage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
