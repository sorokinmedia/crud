import React from 'react';

export default [
	{
		name: 'name',
		type: 'text',
		placeholder: 'Название алерта',
	},
	{
		name: 'text',
		type: 'editor',
		placeholder: 'Текст алерта',
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
	},
	{
		name: 'order_id',
		type: 'number',
		placeholder: 'Порядок',
	},
	{
		name: 'files',
		type: 'uploader',
		uploaderParams: {
			listType: 'picture',
			multiple: true
		}
	}

]
