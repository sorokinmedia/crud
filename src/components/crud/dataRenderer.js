/* eslint-disable no-case-declarations */
import React from 'react'
import {
	DateCell,
	TextCell,
	ArrTextCell,
	ActionsCell,
	BooleanCell,
	ArrObjectCell,
	HtmlCell, ArrayCell
} from '../tables/helperCells';
import { Link } from 'react-router-dom'


export default (row, column, modelName, iconTheme, moment) => {
	if (row[column.id] !== 0 && !row[column.id] && row[column.id] !== false) return null;
	switch (column.type) {
	case 'object':
		return TextCell(row[column.id].alias || row[column.id].name);
	case 'actions':
		return ActionsCell(row, modelName, iconTheme);
	case 'array':
		return ArrTextCell(row[column.id]);
	case 'array_ext':
		return ArrayCell(row[column.id]);
	case 'array_objects':
	    return ArrObjectCell(row[column.id]);
	case 'date':
		return DateCell(Number(row[column.id]) * 1000, moment);
	case 'link':
		const link = row[column.id];
		if (link.url && link.name) return (
			<Link to={link.url}>
				{link.name}
			</Link>
		);
		const actionView = row.actions.find(e => e.id === 'view');
		return actionView && actionView.url
			? (
				<Link to={actionView.url}>
					{row[column.id]}
				</Link>)
			: TextCell(row[column.id]);
	case 'boolean':
		return BooleanCell(row[column.id]);
	case 'html':
		return HtmlCell(row[column.id]);
	default:
		return TextCell(row[column.id]);
	}
};
