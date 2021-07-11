import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Records from "./Records";
import Game from "./Game";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default function App() {

function RecordsPage (){ 
  window.location.href = "./Records"; 
}

function MainPage (){ 
  window.location.href = "./"; 
}

  return (

    <div>
      <Button color="primary" onClick={ MainPage }>
      Game Page
    </Button>
    <Button color="secondary" onClick={ RecordsPage }>
    Records Page
    </Button>
      
      <BrowserRouter>
      
      <Switch>
        <Route exact from="/"> < Game/> </Route>
        <Route exact from="/Game"> < Game/> </Route>
        <Route exact from="/records"> < Records/> </Route>

      </Switch>
      </BrowserRouter>

 
    </div>
  );
}