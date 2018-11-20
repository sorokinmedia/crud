import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { render } from 'react-dom';
import { CrudFull } from '../lib/index';
import createFormFileds from './createObjectTypeFields'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css';

class App extends Component {

	render() {
    	return (<CrudFull
			crudRead="/v1/owner/object/list"
			//crudCreate="/v1/admin/object/type/create"
			modelName="objectTypes"
			createDisabled={true}
			createButtonTitle={'Добавить'}
			createFormOptions={{
			    fields: createFormFileds,
			    title: 'Создать новый',
			    editTitle: 'Редактировать',
			}}
			submitShape={form => ({ Type: { name: form.name, description: form.description } })}
    	/>)
	}
}

App.propTypes = {};
App.defaultProps = {};

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
