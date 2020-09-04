import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import dotenv from 'dotenv';

import './styles.css';
import './material-icons.css';

dotenv.config();

const mountNode = document.getElementById('app');

ReactDOM.render(<App />, mountNode);
