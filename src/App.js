import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Current from './components/Current/Current';
import Upcoming from './components/Upcoming/Upcoming';

function App() {
    let location = useLocation();
    return (
      <div className='App'>
        <Navbar />
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Current} />
          <Route exact path="/upcoming" component={Upcoming}/>
        </Switch>
      </div>
    );
}

export default App;
