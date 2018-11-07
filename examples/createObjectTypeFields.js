export default [
	{
		name: 'name',
		type: 'text',
		placeholder: 'Название',
		validateFunc: (values, errors) => {
			if(!values.name) errors.name = 'Введите название';
			return errors;
		},
	}, {
		name: 'description',
		type: 'text',
		placeholder: 'Описание',
	}
]