import { App } from './components/app'
import React from 'react'
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './styles/App.sass'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
