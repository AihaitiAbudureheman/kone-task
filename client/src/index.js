import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App/App';
import Footer from "./App/views/footer";

render((
    <BrowserRouter>
        <App/>
        <br></br>
        <Footer />
    </BrowserRouter>
), document.getElementById('root'));
