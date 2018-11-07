import React, { Component } from 'react';
import { render } from 'react-dom';
import { CrudFull } from '../lib';
import createFormFileds from './createObjectTypeFields'

class App extends Component {
	constructor(props) {
		super(props);
	}

    render() {
    	return (<CrudFull
            crudRead="/v1/admin/object/type/list"
            crudCreate="/v1/admin/object/type/create"
            modelName="objectTypes"
            createDisabled={false}
            createButtonTitleId="sidebar.objects.type.new"
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

render(<App />, document.getElementById('root'));
