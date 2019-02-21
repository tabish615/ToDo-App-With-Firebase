import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBGBtRf5SanGAIIsBWyuMlYUfpG_yHM-OM",
    authDomain: "todosapp-b937d.firebaseapp.com",
    databaseURL: "https://todosapp-b937d.firebaseio.com",
    projectId: "todosapp-b937d",
    storageBucket: "todosapp-b937d.appspot.com",
    messagingSenderId: "140117394572"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
