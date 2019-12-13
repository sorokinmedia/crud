import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox, Icon } from 'antd';
import actions from '../../redux/actions';

const { setCrudColumns } = actions;
const listStyle = {
	background: '#fff',
	padding: '10px',
	width: '300px',
	zIndex: '9999',
	display: 'flex',
	flexDirection: 'column',
	direction: 'ltr',
	border: '1px #cccccc70 solid'
};

const ColumnSelect = ({ setCrudColumns: setCrudColumnsConnected, filteredColumns }) => {
	const [selectIsOpen, setSelectIsOpen] = useState(false);
	const handleColumnsSelect = useCallback((column, checked, index) => {
		const newColumns = [...filteredColumns];
		newColumns[index].visible = checked;

		setCrudColumnsConnected(newColumns)
	});

	const inner = (
		<span>
			{!selectIsOpen
				? <Icon type="setting" onClick={() => setSelectIsOpen(true)} />
				: <Icon type="close" onClick={() => setSelectIsOpen(false)} />
			}
			{selectIsOpen && <span style={listStyle}>{filteredColumns.map((column, i) => (
				<Checkbox
					onChange={ev => handleColumnsSelect(column, ev.target.checked, i)}
					checked={column.visible}
					style={{ display: 'block', marginLeft: '0px' }}
				>
					{column.title}
				</Checkbox>
			))}
			</span>}
		</span>
	);

	return (
		<span style={{
			display: 'flex', direction: 'rtl', position: 'absolute', top: '-40px', right: '0px', zIndex: '9999'
		}}
		>
			{inner}
		</span>
	);
};

ColumnSelect.propTypes = {
	setCrudColumns: PropTypes.func.isRequired,
	filteredColumns: PropTypes.array.isRequired,
};

export default connect(state => ({ filteredColumns: state.crudColumns }), { setCrudColumns })(ColumnSelect)
