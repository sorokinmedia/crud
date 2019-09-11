import React from 'react'

export default [
	{
		name: 'value',
		type: 'text',
		placeholder: 'Промо код',
		label: <strong>Промо код</strong>,
		validateFunc: (values, errors) => {
			if (!values.value) errors.value = 'Введите промо код';
			return errors;
		}
	},
	{
		name: 'title',
		type: 'text',
		placeholder: 'Название',
		label: <strong>Название</strong>,
		validateFunc: (values, errors) => {
			if (!values.name) errors.name = 'Введите название';
			return errors;
		}
	},
	{
		name: 'description',
		type: 'textarea',
		placeholder: 'Описание',
		label: <strong>Описание</strong>,
		validateFunc: (values, errors) => {
			if (!values.description) errors.description = 'Введите описание';
			return errors;
		}
	},
	{
		name: 'cat_id',
		type: 'select',
		label: <strong>ID категории</strong>,
		placeholder: 'ID категории',
		validateFunc: (values, errors) => {
			if (!values.role) errors.role = 'Выберите ID категории';
			return errors;
		}
	},
	{
		name: 'beneficiary_id',
		type: 'select',
		placeholder: 'ID пользователя, к которому привязать промокод',
		label: <strong>ID пользователя</strong>,
		validateFunc: (values, errors) => {
			if (!values.beneficiary_id) errors.beneficiary_id = 'Введите описание';
			return errors;
		}
	},
	{
		name: 'date_from',
		type: 'date',
		placeholder: 'Дата с ',
		label: <strong>Дата с</strong>,
		validateFunc: (values, errors) => {
			if (!values.date_from) errors.date_from = 'Введите дату с';
			return errors;
		}
	},
	{
		name: 'date_to',
		type: 'date',
		placeholder: 'Дата по',
		label: <strong>Дата по</strong>,
		validateFunc: (values, errors) => {
			if (!values.date_to) errors.date_to = 'Введите дату по';
			return errors;
		}
	},
	{
		name: 'sum_promo',
		type: 'number',
		placeholder: 'Промо сумма',
		label: <strong>Промо сумма</strong>,
		validateFunc: (values, errors) => {
			if (!values.sum_promo) errors.sum_promo = 'Введите промо сумму';
			return errors;
		}
	},
	{
		name: 'sum_recharge',
		type: 'number',
		placeholder: 'Сумма для активации промокода',
		label: <strong>Сумма для активации промокода</strong>,
		validateFunc: (values, errors) => {
			if (!values.sum_recharge) errors.sum_recharge = 'Введите сумму для активации промокода';
			return errors;
		}
	},
	{
		name: 'is_available_old',
		type: 'checkbox',
		placeholder: 'Доступен ли старым пользователем',
	},

]
