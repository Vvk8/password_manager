import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from "./redux/store";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

