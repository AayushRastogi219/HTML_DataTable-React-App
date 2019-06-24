import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import MainForm from './components/MainForm'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
         
          <Route exact path='/' component={MainForm} />
        </div>
      </Router>
    );
  }
}

export default App;
