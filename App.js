import React from 'react';
import Providers from './navigation';

import {firebaseConfig} from './screens/config'
import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const App = () => {
  return <Providers/>;
}
 export default App;



import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo- constants).",
]);
/*

for google signIn
android
signing certificate fingerprint: c2:44:93:72:bf:41:57:fd:d8:24:f9:1f:bf:5e:9d:7a:ab:c2:a9:2c

Client Id :336988866402-457j14cn492jhrted2p7g7tbl335be58.apps.googleusercontent.com

*/

/* 
var firebaseConfig = {
    apiKey: "AIzaSyA2-K5FtkOYs9u_be2zHlueR4YcZmXiH3k",
    authDomain: "connector-68a39.firebaseapp.com",
    projectId: "connector-68a39",
    storageBucket: "connector-68a39.appspot.com",
    messagingSenderId: "336988866402",
    appId: "1:336988866402:web:36751161f134845e6b0e3b"
  };
*/