import React from 'react';

export default [
	{
		name: 'name',
		type: 'text',
		placeholder: 'Название алерта',
		validateFunc: (values, errors) => {
			if (!values.name) errors.name = 'Введите название';
			return errors;
		}
	},
	{
		name: 'text',
		type: 'editor',
		placeholder: 'Текст алерта',
		validateFunc: (values, errors) => {
			if (!values.name) errors.name = 'Введите текст';
			return errors;
		}
	},
	{
		name: 'image',
		type: 'text',
		placeholder: 'Путь до картинки без домена',
	},
	{
		name: 'role',
		type: 'select',
		placeholder: 'Роль',
		validateFunc: (values, errors) => {
			if (!values.role) errors.role = 'Выберите роль';
			return errors;
		}
	},
	{
		name: 'view_count_to_close',
		type: 'number',
		placeholder: 'Кол-во просмотр для закрытия',
	},
	{
		name: 'finish_date',
		type: 'date',
		placeholder: 'Дата окончания',
	},
	{
		name: 'group_id',
		type: 'select',
		placeholder: 'Группа',
		validateFunc: (values, errors) => {
			if (!values.group_id) errors.group_id = 'Выберите группу';
			return errors;
		}
	},
	{
		name: 'order_id',
		type: 'number',
		placeholder: 'Порядок',
		validateFunc: (values, errors) => {
			if (!values.order_id) errors.order_id = 'Выберите порядковый номер';
			return errors;
		}
	},

]
