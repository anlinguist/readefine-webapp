import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as FullStory from '@fullstory/browser';

// @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
const root = ReactDOM.createRoot(document.getElementById('root'));
FullStory.init({ orgId: '184F51' });

// @ts-ignore
window.REACT_APP_RDFN_HOST = import.meta.env.VITE_REACT_APP_RDFN_HOST;
console.log("set window.REACT_APP_RDFN_HOST to", import.meta.env.VITE_REACT_APP_RDFN_HOST);

root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
reportWebVitals();
