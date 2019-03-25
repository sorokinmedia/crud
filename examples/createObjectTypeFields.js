export default [
	{
		name: 'task_type_id',
		type: 'select',
		placeholder: 'Тип задачи',
		validateFunc: (values, errors) => {
			if (!values.task_type_id) errors.task_type_id = 'Выберите тип задачи';
			return errors;
		}
	},
	{
		name: 'add_date',
		type: 'date',
		placeholder: 'Дата',
		validateFunc: (values, errors) => {
			if (!values.add_date) errors.add_date = 'Выберите тег заказчика';
			return errors;
		}
	},
	{
		name: 'user_tag_id',
		type: 'select',
		placeholder: 'Тег заказчика',
		validateFunc: (values, errors) => {
			if (!values.user_tag_id) errors.user_tag_id = 'Выберите тег заказчика';
			return errors;
		}
	},
	{
		name: 'commission_task',
		type: 'number',
		placeholder: 'Комиссия за задачу в %',
		validateFunc: (values, errors) => {
			if (values.commission_task && values.commission_task < 0) errors.commission_task = 'Отрицательная комиссия';
			return errors;
		}
	},
	{
		name: 'commission_check',
		type: 'number',
		placeholder: 'Комиссия за проверку в %',
		validateFunc: (values, errors) => {
			if (values.commission_task && values.commission_check < 0) errors.commission_check = 'Отрицательная комиссия';
			return errors;
		}
	}
]
