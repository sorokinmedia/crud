This library contains few components to Create, Read, Update and Delete data.

#### Installing
``` npm i sm-react-crud ```

#### CrudFull
Renders a list of items with a button to create new one. Items can be sorted/filtred by the each sorted/filtred column.

#### API
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
provides a function to set a shape of update payload 
```form => {data: form, model: 'updateModelName'}```
##### createDisabled
disables create mode

#### Example
```
import createFormFileds from './createFormFileds
import {crudFull} from 'crud'

<CrudFull
    crudRead={'https://api/object/list'}
    crudCreate={'https://api/object/create'}
    modelName={'objectsName'}
    createDisabled={false}
    createButtonTitleId={"sidebar.objects.type.new"}
    createFormOptions={{
        fields: createFormFileds,
        title: 'Create new',
        editTitle: 'Edit object',
    }}
    submitShape={form => ({
        name: form.name.toUpperCase(), 
        description: form.description.toLowerCase()
    })}
    customActionsFunc={(action, object) => {
        switch(action.id) {
            case 'took':
                this.props.setKeyModal(action.id, object.id);
                break;
            case 'return':
                this.props.setKeyModal(action.id, object.id);
                break;
            default:
                return null;
        }
    }}
/>
```