This library contains few components to Create, Read, Update and Delete data.

## Installing
``` npm i sm-react-crud ```

Then you have to connect reducer and saga from the package
```
import {reducer as crudReducers} from 'sm-react-crud'

...

const store = createStore(
	combineReducers({
		...reducers,
		...crudReducers
	}),
	composeEnhancers(applyMiddleware(...middlewares))
);

...

```

```
    ...
    
    import {saga as crudSagas} from 'sm-react-crud'
    
    ...
    
    export default function* devSaga() {
    	yield all([
    	    ...
            crudSagas(),
            ...
    	]);
    }
```


## CrudFull
Renders a list of items with a button to create new one. Items can be sorted/filtred by the each sorted/filtred column.

## API
##### crudCreate
an URL to make a creating item request.

##### crudRead
 an URL to fetch items.
##### modelName 
a name of model, unique identification key for this component.
##### customActionsFunc
provides a function to customazing action handling
##### createButtonTitle
create button label
##### createFormOptions:
options to create form - fields key is required
##### submitShape
provides a function to set a shape of submit payload 
```form => {data: form, model: 'modelName'}```
##### updateShape
provides a function to set shape of updating payload 
```form => {data: form, model: 'updateModelName'}```
##### createDisabled
disables create mode

##### iconsProvider
provides a function to chose an icon by id
```
(id) => {
    switch (id) {
        case 'update':
            return 'edit';
...
```

##### btnStyle
styles object for default button component

##### ButtonComponent
custom button component

##### tableStyle
style object for table

##### tableWrapper
component to wrap the table

##### fixActionColumn
bool prop to fix action column on the right side

##### iconTheme
antd icon theme (default: 'outline')

##### size
antd table size (default: 'default')

##### tdClass
specify class for td tag

##### initialModal
provides an object to initialize modal form

##### scrollX
scroll size whian actions column is fixed (default: 1300)

##### pageSize
items count on one page (default: 20)

#### Example
./createFormFields

```
export default [
{
	name: 'name',
	type: 'text',
	placeholder: 'Enter a name',
	label: <strong>Name</strong>,
	validateFunc: (values, errors) => {
		if(!values.name) errors.name = 'You shoul fill this field';
		return errors;
	},
}, {
	name: 'description',
	type: 'text',
	placeholder: 'Enter a description',
	label: <strong>Description</strong>,
}, {
	name: 'status_id',
	type: 'select',
	placeholder: 'Enter a status',
	label: <strong>Status</strong>,
	component: props => <Status {...props} />
}]
```
Use case
```
import createFormFileds from './createFormFileds'
import {crudFull} from 'sm-react-crud'

const objects = <CrudFull
    crudRead={'https://api/object/list'}
    crudCreate={'https://api/object/create'}
    modelName={'objectsName'}
    createDisabled={false}
    createButtonTitle={"New object"}
    createFormOptions={{
        fields: createFormFileds,
        title: 'Create new',
        editTitle: 'Edit object',
    }}
    submitShape={form => ({
        name: form.name.toUpperCase(), 
        description: form.description.toLowerCase()
    })}
    updateShape={record => ({
        name: record.name, 
        description: record.description.toLowerCase()
    })}
    customActionsFunc={(action, object) => {
        switch(action.id) {
            case 'took':
                //some action
                break;
            case 'return':
                //some action
                break;
            default:
                return null;
        }
    }}
/>
```

#### requestSaga && apiAdress

You have to define apiAdress in your store to use requestSaga for requests. 
It can be used for fetching data or creating a new record.

### Modal form logic

#### Redux Store Key
You can specify store key to set options property for select or another data for your field
```
   ...
   {
   	name: 'status_id',
   	type: 'select',
   	placeholder: 'Enter a status',
   	label: <strong>Status</strong>,
   	component: props => <Status {...props} />
   	optionsKey: 'statusOptions'
   },
   ... 
```
#### Dynamics

Sometimes you need to change fields array dynamically depending on the usability logic.

To impliment it, use  createFormOptions and provide modified fields array by the 'fields' key:
```
createFormOptions={{
    fields: modifiedCreateFormFileds,
    title: 'Create record',
    editTitle: 'Edit record',
}}
```
Available field types: text, textarea, number, date, select, checkbox
