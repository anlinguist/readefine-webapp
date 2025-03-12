/*global browser*/
/*global chrome*/

import { initializeApp } from "firebase/app";
import type { FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyATJuMtg6ucTh5RROL6V4WVa4xB4HWXZgA',
  authDomain: 'auth.getreadefine.com',
  databaseURL: 'https://query-readefine.firebaseio.com',
  projectId: 'query-readefine',
  storageBucket: 'query-readefine.appspot.com',
  messagingSenderId: '505377161365',
  appId: '1:505377161365:web:1e9f68316802dd87df1b9c',
  measurementId: "G-7YHB86PJVQ"
};

const app = initializeApp(firebaseConfig);

export default app;