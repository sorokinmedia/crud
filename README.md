This library contains few components to Create, Read, Update and Delete data.

#### CrudFull
Renders a list of items with a button to create new one. Items can be sorted/filtred by the each sorted/filtred column.

#### API
####crudCreate
an URL to make a creating item request.

####crudRead
 an URL to fetch items.
####modelName 
a name of model, unique identification key for this component.
####customActionsFunc
a func for customazing action handling
####createButtonTitle
create button label
####createFormOptions:
options for create form - fields key is required
####submitShape
a shape of submit payload, form => {data: form, user: form.name}
####createDisabled
disables create mode

###Example
```
import createFormFileds from './createFormFileds

<CruFull
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
/>
```