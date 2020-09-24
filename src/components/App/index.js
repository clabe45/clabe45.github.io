import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from '../Navbar/index.js'
import Home from '../Home/index.js'
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
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Router>
    </div>
  )
}

export default App;
