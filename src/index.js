// import dotenv from 'dotenv';
// dotenv.config();
import "object-fit-polyfill";
import "intersection-observer";

import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';

import { Themer } from './library';

// firebase setup
const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "ng-photography.firebaseapp.com",
  databaseURL: "https://ng-photography.firebaseio.com",
  projectId: "ng-photography",
  storageBucket: "ng-photography.appspot.com",
  messagingSenderId: "998704146197",
}
firebase.initializeApp(config);


render(
  <Themer theme={{
    colors: {
      main: "#6CA4C8",
      secondary: "#B88A9F",
      secondary_light: "rgba(184, 138, 159, .12)",
      dark: "#121F1F",
      grey: "#F9F8F7",
      light: "#FFFFFF",
    }
  }}>
    <App />
  </Themer>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
