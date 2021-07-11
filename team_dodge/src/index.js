import React from 'react';
import ReactDOM from 'react-dom';
import Villain from './villain';
import Character from './character'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
    <Villain />
    <Character />
  </React.StrictMode>,
  document.getElementById('root')
);


