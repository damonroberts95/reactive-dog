import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'

var DATA = [];

ReactDOM.render(
    <App dogs={DATA}/>,
  document.getElementById('main')
);
