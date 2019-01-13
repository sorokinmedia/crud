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
		return (<div style={{ width: '80%' }}>
			{/*<CrudFull
				crudRead="/v1/admin/object/type/list"
				crudCreate="/v1/admin/object/type/create"
				modelName="objectTypes"
				createDisabled={false}
				createButtonTitle={'Добавить'}
				createFormOptions={{
				    fields: createFormFileds,
				    title: 'Создать новый',
				    editTitle: 'Редактировать',
				}}
				initialModal={{
					name: 'Name123ee`'
				}}
				submitShape={form => ({ Type: { name: form.name, description: form.description } })}
				getChildrenUrl={id => `/v1/owner/object/${id}/child`}
	        />*/}
			{/*<CrudFull*/}
			{/*crudRead={`/v1/owner/object/list`}*/}
			{/*modelName={'object'}*/}
			{/*customActionsFunc={this.actionsFunc}*/}
			{/*getChildrenUrl={id => `/v1/owner/object/${id}/child`}*/}
			{/*//tableWrapper={TableWrapper}*/}
			{/*//size={'small'}*/}
			{/*/>*/}


			<CrudFull
				crudRead="/v2/admin/user/backend-list"
				modelName="objectsName"
				fixActionColumn
				scrollX={1400}
				customActionsFunc={(action, object) => {
					console.log(object, action)
				}}
			/>

		</div>)
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
