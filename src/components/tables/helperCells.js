import React from 'react';
import Action from '../crud/action'
import moment from 'moment'

const DateCell = data => <p>{moment(data).format('DD.MM.YYYY')}</p>;
const TextCell = text => <span>{text}</span>;
const BooleanCell = value => <span>{value ? 'Да' : 'Нет'}</span>;
const ArrTextCell = arr => arr.map(elem => <p>{elem}</p>);
const ActionsCell = (row, modelName, iconTheme) => row.actions.map(action =>
	<Action data={action} row={row} key={action.id} modelName={modelName} iconTheme={iconTheme} />
);

export {
	DateCell,
	TextCell,
	ArrTextCell,
	ActionsCell,
	BooleanCell
};
