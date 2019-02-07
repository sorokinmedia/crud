import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'
import { store } from './redux/store';
import { render } from 'react-dom';
import { CrudFull } from '../src/index';
import createCommissionFields from './createObjectTypeFields'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css';
import App from './App'

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
