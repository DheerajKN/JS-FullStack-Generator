import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    process.env.ELECTRON_PROD || false ?
        <HashRouter>
            <App />
        </HashRouter>
        :
        <BrowserRouter>
            <App />
        </BrowserRouter>, document.getElementById('root'));
