import React, { Component } from 'react';
import { withRouter  } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'

import 'react-notifications-component/dist/theme.css'
import './app.css';

// Internal
import Routing from 'configs/routing'

class App extends Component {


  render() {
    return (
      <div className="App">
        <ReactNotification />
        <Routing/>
      </div>
    );
  }
}

export default withRouter(App);
