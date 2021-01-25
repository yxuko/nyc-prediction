import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import History from './History';
import store from './store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router history={History}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);

serviceWorker.unregister();
