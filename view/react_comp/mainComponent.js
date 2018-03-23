import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login.js';
import Dashboard from './dashboard.js';
import api from '../js/api.js';
const app = document.getElementById('helloworld');
api.getUser().then(data=>ReactDOM.render(<Dashboard user={data.user}
    owner={data.owner}/>,app)).catch(err=>ReactDOM.render(<Login/>,app));