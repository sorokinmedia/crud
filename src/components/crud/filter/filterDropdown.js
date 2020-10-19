import React from 'react'
import { Input, Button, Checkbox, Select, DatePicker } from 'antd';
import moment from 'moment/moment';
import 'moment/locale/ru';

const { Option } = Select;

const renderDropdown = (name, type, options, { setSelectedKeys, selectedKeys, confirm }) => {
	switch (type) {
	case 'checkbox':
		return (
			<span>
				<Checkbox
					value={selectedKeys}
					onChange={e => setSelectedKeys(e.target.checked.toString())}
					onPressEnter={() => { confirm() }}
				/>
				<br />
			</span>
		);
	case 'select':
		return (
			<Select
				value={selectedKeys}
				placeholder="Выбрать"
				onChange={(e) => { setSelectedKeys(e); confirm(); }}
				onPressEnter={() => { confirm() }}
				style={{ width: '130px', marginRight: '8px' }}
				showSearch
				filterOption={(search, option) =>
					option.props.children.toLowerCase().indexOf(search.toLowerCase()) >= 0
				}
				onSearch={() => {}}
			>
				{options.map(opt => (
					<Option
						value={opt.value}
						key={opt.value}
						onClick={() => {
							setSelectedKeys(opt.value); setTimeout(() => confirm(), 100);
						}}
					>
						{opt.text}
					</Option>
				))}
			</Select>
		);
	case 'date':
		return (
			<DatePicker
				value={selectedKeys && !(selectedKeys instanceof Array)
					? moment(selectedKeys, 'DD/MM/YYYY').locale('ru')
					: null
				}
				onChange={value => setSelectedKeys(value)}
				onPressEnter={() => { confirm() }}
				placeholder="Выберите дату"
				format="DD.MM.YYYY"
				style={{ marginRight: '8px' }}
			/>
		);
	case 'date_range':
		return (
			<DatePicker.RangePicker
				value={selectedKeys && (selectedKeys instanceof Array) && selectedKeys.length
					? [
						moment(selectedKeys[0], 'DD.MM.YYYY').locale('ru'),
						moment(selectedKeys[1], 'DD.MM.YYYY').locale('ru')]
					: null
				}
				onChange={value => setSelectedKeys(value)}
				onPressEnter={() => { confirm() }}
				placeholder={['От', 'До']}
				format="DD.MM.YYYY"
				style={{ marginRight: '8px' }}
			/>
		);
	default:
		return (
			<Input
				type={type}
				placeholder="Поиск"
				value={selectedKeys}
				onChange={e => setSelectedKeys(e.target.value ? e.target.value : null)}
				onPressEnter={() => { confirm() }}
			/>
		)
	}
};
export default (name, type, options) => params => (
	<div
		className="custom-filter-dropdown"
	>
		{renderDropdown(name, type, options, params)}
		<Button type="primary" onClick={() => { params.confirm() }}>Поиск</Button>
		<Button onClick={() => { params.clearFilters() }}>Сбросить</Button>
	</div>
);
