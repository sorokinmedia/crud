import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { render } from 'react-dom';
import { CrudFull } from '../src/index';
import createFormFileds from './createObjectTypeFields'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css';

class App extends Component {

	render() {
    	return (<div style={{width: '80%'}}><CrudFull
			crudRead="/v1/admin/user/list"
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
			getChildrenUrl={id => `/v1/owner/object/${id}/child`}
    	/></div>)
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
