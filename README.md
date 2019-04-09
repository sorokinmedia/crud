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

## FRONTEND API
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
provides a function to choose an icon by id
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

#### getChildrenUrl
url to fetch children

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
	options: [
	    {id: 1, name: 'Да'},
	    {id: 2, name: 'Нет'}
	],
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

#### Field object

Field object may contains following

name: string - input name,

type: string - input type,

placeholder: string - placeholder text,

label: string or html - label,

component: react class or function - renderer for input,

dropdownRender: react class or function - antd dropdown for input,

optionsKey: string - key in store to get input options arr.

Available field types: text, textarea, number, date, select, checkbox


#### Redux Store Key
You can specify store key to set options property for select or another data for your field.
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
## BACKEND API
Backend response must contains four fields at least:
 - columns : array;
 - count : number;
 - filter : object;
 - items : array. 
 
#### Columns
Columns is an array of columns() you want to render into the table. Each column includes several fields:
 - id : number, uniq identificator, which is matched with key in record;
 - title: string, text you want to render as a column name;
 - type: string, type of the data you send under the key;
 - order: object, inlides fields 'can' (setting order available or not) and 'orders' (an array of available orders ).       
 - filter: object, inlides fields:
    - can (setting filter available or not),
    - type (type of filter input),
    - defaultValue (default filter input value)
    - query (url to fetch filter options)
     
 Available filter types: 
 - input_number (input type 'number')
 - input_text (input type 'text')
 - date_picker ( antd date picker)
 - select_one (select, can select one option)
 - select (miltiple select)
 - boolean (checkbox)  

#### Items
 It's an array of records and a main table info. It must includes keys that are matched with culumns ids and contains
 the same type of data that are specified in columns type. Example is below.
 
 ```
    {"response":
        {
            "items":[
                {
                    "objectType": 'room',
                    "object":{
                        "id":22,
                        "name":"Ул. Чапаевская 210 / Вилоновская 10, кв 3 (Квартира)"
                    },
                    "worker":{
                        "id":44,
                        "name":"var1232enik163_yandex_ru"
                    },
                    "description":"hh",
                    "action_date":1549224000,
                    "updated_at":1549280956,
                },
                {
                    "objectType": 'flat',
                    "object":{
                        "id":22,
                        "name":"Ул. Чапаевская 210 / Вилоновская 10, кв 3 (Квартира)"},
                        "worker":{
                            "id":25,
                            "name":"DSTS"
                        },
                    "description":"ghjgh",
                    "action_date":1549137600,
                    "updated_at":1549186595,
                }
            ],
            "columns":[
                {
                    "id":"objectType",
                    "title":"Тип",
                    "type":"string",
                    "filter": {
                        "can":true,
                        "type":"select_one",
                        "defaultValue":"",
                        "query":"/v1/owner/tenant/filter/action-types"
                    },
                    "order":{
                        "can":true,
                        "orders":[
                            "SORT_ASC",
                            "SORT_DESC"
                        ]
                    }
                },{
                    "id":"object",
                    "title":"Объект",
                    "type":"object",
                    "filter":{
                        "can":true,
                        "type":"select_one",
                        "defaultValue":"",
                        "query":"/v1/owner/tenant/filter/objects"
                    },
                    "order":{
                        "can":false,
                        "orders":[]
                    }
                }
            ],
            count: 2,
            filter: {}
        }
    }
```
You can see that column with id 'objectType' has field 'type' with value 'string'. In item object
we have a field 'objectType' which is string, what is matched with column field 'type'.
There is a ralation column id -> items key.

##### ArrayCell
You can specify 'array_ext' column type to render an array data as you wish using following parameters:
- "values", data you wont to render
- "type", data type ("text", "date", "array_ext"), default 'text'
- "isHtml", indicates whether the data is html, default 'false'
- "delimiter", separator for "values" item, default none
- "dateFormat", indicates format of rendering date, for example 'DD-MM-YYYY', default: 'DD.MM.YYYY'
- "style", style object for item

Example: 

```
users: {
    values: ['<div><strong><a>Alex</a></strong></div>', '<div><em><a>Masha</a></em></div>'],
    isHtml: true,
    type: 'text',
    delimiter: '----'
}
```
