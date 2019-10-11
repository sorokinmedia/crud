import 'antd/dist/antd.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import AppWHO from './AppWHO'
import { store } from './redux/store';

render(
	<Provider store={store}>
		<Router>
			<AppWHO />
		</Router>
	</Provider>,
	document.getElementById('root')
);
