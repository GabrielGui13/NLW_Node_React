//primeiro app executado na aplicacao
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; //importa a funcao app com html
import './services/firebase';

ReactDOM.render( //renderizar algo no elemento do html
  <React.StrictMode> 
    <App/> 
  </React.StrictMode>,
  document.getElementById('root')
); //jsx -> javascript xml, forma de usar html
//dentro do react.strictmode deve ter um html