import React from 'react'
import { Input, Button, Checkbox, Select } from 'antd';

const { Option } = Select;

export default (name, type, options) => ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => <div
	className="custom-filter-dropdown"
>
	{type === 'checkbox' ? <span><Checkbox
		value={selectedKeys}
		onChange={e => setSelectedKeys(e.target.checked.toString())}
		onPressEnter={() => { confirm() }}
	/><br />
	</span>
		:
		type === 'select' ? <Select
			value={selectedKeys}
			placeholder="Выбрать"
			onChange={(e) => { setSelectedKeys(e); confirm(); }}
			onPressEnter={() => { confirm() }}
			style={{ width: '130px', marginRight: '8px' }}
		>
			{options.map(opt => (<Option value={opt.value}
				key={opt.value}
				onClick={(e) => {
					setSelectedKeys(opt.value); setTimeout(() => confirm(), 100);
				}
				}
			>
				{opt.text}
			</Option>))}
		</Select>
			:
		<Input
			type={type}
			placeholder="Поиск"
			value={selectedKeys}
			onChange={e => setSelectedKeys(e.target.value ? e.target.value : null)}
			onPressEnter={() => { confirm() }}
		/>}
	<Button type="primary" onClick={() => { confirm() }}>Поиск</Button>
	<Button onClick={() => { clearFilters() }}>Сбросить</Button>
</div>;
