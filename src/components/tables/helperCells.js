import React from 'react';
import Action from '../crud/action'
import moment from 'moment'

const DateCell = data => <p>{moment(data).format('DD.MM.YYYY')}</p>;
const TextCell = text => <p>{text}</p>;
const ArrTextCell = arr => arr.map(elem => <p>{elem}</p>);
const ActionsCell = (row, modelName) => row.actions.map(action =>
	<Action data={action} row={row} key={action.id} modelName={modelName}/>
);

export {
	DateCell,
	TextCell,
	ArrTextCell,
	ActionsCell,
};
