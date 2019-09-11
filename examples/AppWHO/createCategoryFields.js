import React from 'react'

export default [
	{
		name: 'name',
		type: 'text',
		placeholder: 'Название',
		label: <strong>Название</strong>,
		validateFunc: (values, errors) => {
			if (!values.name) errors.name = 'Введите название';
			return errors;
		}
	},
	{
		name: 'prices',
		type: 'text',
		placeholder: 'Описание оплаты оплаты',
		label: <strong>Описание оплаты</strong>,
	},
	{
		name: 'main_skill_id',
		type: 'select',
		label: <strong>ID основного навыка</strong>,
		placeholder: 'ID основного навыка',
		validateFunc: (values, errors) => {
			if (!values.main_skill_id) errors.main_skill_id = 'Выберите навык';
			return errors;
		}
	},
	{
		name: 'is_active',
		type: 'checkbox',
		placeholder: 'Активен',
	},
]
