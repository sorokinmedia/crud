import React from 'react'

export default [
	{
		name: 'task_type_id',
		type: 'select',
		placeholder: 'Тип задачи',
		label: <strong>Тип задачи</strong>,
		validateFunc: (values, errors) => {
			if (!values.task_type_id) errors.task_type_id = 'Выберите тип задачи';
			return errors;
		}
	},
	{
		name: 'user_tag_id',
		type: 'select',
		placeholder: 'Тег заказчика',
		label: <strong>Тег заказчика</strong>,
		validateFunc: (values, errors) => {
			if (!values.user_tag_id) errors.user_tag_id = 'Выберите тег заказчика';
			return errors;
		}
	},
	{
		name: 'task_type_commission',
		type: 'number',
		placeholder: 'Комиссия за задачу в %',
		label: <strong>Комиссия за задачу</strong>,
		validateFunc: (values, errors) => {
			if (values.task_type_commission && values.task_type_commission < 0) errors.task_type_commission = 'Отрицательная комиссия';
			return errors;
		}
	},
]
