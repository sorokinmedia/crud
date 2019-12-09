import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox, Icon } from 'antd';
import actions from '../../redux/actions';

const { setCrudColumns } = actions;

const ColumnSelect = ({ setCrudColumns: setCrudColumnsConnected, filteredColumns }) => {
	const [selectIsOpen, setSelectIsOpen] = useState(false);
	const handleColumnsSelect = useCallback((column, checked, index) => {
		const newColumns = [...filteredColumns];
		newColumns[index].visible = checked;

		setCrudColumnsConnected(newColumns)
	});

	if (!selectIsOpen) return <Icon type="setting" onClick={() => setSelectIsOpen(true)} />;

	return (
		<span>
			<Icon type="close" onClick={() => setSelectIsOpen(false)} style={{ marginRight: '15px' }} />
			{filteredColumns.map((column, i) => (
				<Checkbox
					onChange={ev => handleColumnsSelect(column, ev.target.checked, i)}
					checked={column.visible}
				>
					{column.title}
				</Checkbox>
			))}
		</span>
	);
};

ColumnSelect.propTypes = {
	columns: PropTypes.array.isRequired,
	setCrudColumns: PropTypes.func.isRequired,
	filteredColumns: PropTypes.array.isRequired,
};

export default connect(state => ({ filteredColumns: state.crudColumns }), { setCrudColumns })(ColumnSelect)
