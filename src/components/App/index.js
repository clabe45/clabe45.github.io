import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../Home/index.js'
import About from '../About/index.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Switch>
          <div className="text-center">
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
