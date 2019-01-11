/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import Action from '../crud/action'
import moment from 'moment'
import { Icon } from 'antd'

const DateCell = data => <p>{moment(data)
	.format('DD.MM.YYYY')}</p>;
const TextCell = text => <span>{text}</span>;
const BooleanCell = value => (
	<span>
		{value
			? <Icon type="check" style={{ color: 'green' }} />
			: <Icon type="close" style={{ color: 'red' }} />
		}
	</span>);
const ArrTextCell = arr => arr.map(elem => <p>{elem}</p>);
const HtmlCell = html => <span dangerouslySetInnerHTML={{ __html: html }} />;
const ActionsCell = (row, modelName, iconTheme) => row.actions.map(action => (
	<Action data={action} row={row} key={action.id} modelName={modelName} iconTheme={iconTheme} />))
const ArrObjectCell = (obj) => {
	console.log('obj', obj)
	if (!Array.isArray(obj) || !obj.length) return null

	console.log('obj.lenght', obj.length)
	return obj.map(({ created_at = false, updated_at = false, ...rest }) => {
		console.log('rest', rest)
		const restValues = rest ? Object.values(rest) : false
		const restAttributes = restValues
			? restValues.map((el, i) => <span key={i}>{el}</span>) : ''
		console.log('restValues', restValues)
		console.log('restAttributes', restAttributes)
		return (
			<Fragment>
				<p>
					{created_at ? moment.unix(created_at)
						.format('DD.MM.YYYY') : ''} {updated_at ? moment.unix(updated_at)
					.format('DD.MM.YYYY') : ''} {restAttributes}
				</p>
			</Fragment>)
	})
}

export {
	DateCell,
	TextCell,
	ArrTextCell,
	ArrObjectCell,
	ActionsCell,
	BooleanCell,
	HtmlCell
};
