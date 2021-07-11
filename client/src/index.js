import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import Villain from './villain';
// import Character from './character';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
     <App />
    <Villain />

  </React.StrictMode>,
  document.getElementById('root')
);
