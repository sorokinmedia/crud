import {
	DateCell,
	TextCell,
	ArrTextCell,
	ActionsCell
} from '../tables/helperCells';


export default (row, column, modelName) => {
	switch (column.type) {
		case 'object':
			return TextCell(row[column.id].alias);
		case 'actions':
			return ActionsCell(row, modelName);
		case 'array':
			return ArrTextCell(row[column.id]);
		case 'date':
			return DateCell(Number(row[column.id])*1000);
		default:
			return TextCell(row[column.id]);
	}
};