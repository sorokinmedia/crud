import React from 'react'
import {
	DateCell,
	TextCell,
	ArrTextCell,
	ActionsCell
} from '../tables/helperCells';
import { Link } from 'react-router-dom'


export default (row, column, modelName, iconTheme) => {
	if (!row[column.id]) return null;


	switch (column.type) {
	case 'object':
		return TextCell(row[column.id].alias || row[column.id].name);
	case 'actions':
		return ActionsCell(row, modelName, iconTheme);
	case 'array':
		return ArrTextCell(row[column.id]);
	case 'date':
		return DateCell(Number(row[column.id]) * 1000);
	case 'link':
		const actionView = row.actions.find(e => e.id === 'view');
		return actionView && actionView.url ? <Link to={actionView.url}>
			{row[column.id]}
        </Link> : TextCell(row[column.id]);
	default:
		return TextCell(row[column.id]);
	}
};
