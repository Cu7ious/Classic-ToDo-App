/**
 * This module creates renders the APP
 * and mounts it to the "root" DOM node
 */
import './main.css';

import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

dotenv.config();

ReactDOM.render(<App />, document.getElementById("root"));
