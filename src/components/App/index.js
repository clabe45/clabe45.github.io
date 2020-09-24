import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from '../Navbar/index.js'
import Home from '../Home/index.js'
import About from '../About/index.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Row>
          <Col className="navbar-column">
            <Navbar/>
          </Col>

          <Col>
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
          </Col>
        </Row>
      </Router>
    </div>
  )
}

export default App;
