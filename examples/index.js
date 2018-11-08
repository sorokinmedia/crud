import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { render } from 'react-dom';
import { CrudFull } from '../src/index';
import createFormFileds from './createObjectTypeFields'
import 'antd/dist/antd.css';

class App extends Component {

	render() {
    	return (<CrudFull
			crudRead="/v1/admin/object/type/list"
			crudCreate="/v1/admin/object/type/create"
			modelName="objectTypes"
			createDisabled={false}
			createButtonTitle={'Добавить тип'}
			createFormOptions={{
			    fields: createFormFileds,
			    title: 'Создать новый тип',
			    editTitle: 'Редактировать тип',
			}}
			submitShape={form => ({ Type: { name: form.name, description: form.description } })}
    	/>)
	}
}

App.propTypes = {};
App.defaultProps = {};

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
