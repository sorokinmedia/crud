import React from 'react';
import Action from '../crud/action'
import moment from 'moment'
import { Icon } from 'antd'

const DateCell = data => <p>{moment(data).format('DD.MM.YYYY')}</p>;
const TextCell = text => <span>{text}</span>;
const BooleanCell = value => <span>{value ?
	<Icon type={'check'} style={{color: 'green'}} />
	: <Icon type={'close'} style={{color: 'red'}} />
}</span>;
const ArrTextCell = arr => arr.map(elem => <p>{elem}</p>);
const HtmlCell = html => <span dangerouslySetInnerHTML={{__html: html}}></span>;
const ActionsCell = (row, modelName, iconTheme) => row.actions.map(action =>
	<Action data={action} row={row} key={action.id} modelName={modelName} iconTheme={iconTheme} />
);

export {
	DateCell,
	TextCell,
	ArrTextCell,
	ActionsCell,
	BooleanCell,
	HtmlCell
};
