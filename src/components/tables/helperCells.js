/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import Action from '../crud/action'
import moment from 'moment'
import { Icon } from 'antd'

const DateCell = data => (
	<p>{moment(data).format('DD.MM.YYYY')}</p>
);
const TextCell = text => (
	<span>{text}</span>
);
const BooleanCell = value => (
	<span>
		{value
			? <Icon type="check" style={{ color: 'green' }} />
			: <Icon type="close" style={{ color: 'red' }} />
		}
	</span>
);
const ArrTextCell = arr => arr.map(elem => (
	<p>{elem}</p>
));
const HtmlCell = html => (
	<span dangerouslySetInnerHTML={{ __html: html }} />
);
const ActionsCell = (row, modelName, iconTheme) => row.actions.map(action => (
	<Action data={action} row={row} key={action.id} modelName={modelName} iconTheme={iconTheme} />
));
const ArrObjectCell = (obj) => {
	if (!Array.isArray(obj) || !obj.length) return null;
	return obj.map(({ created_at = false, updated_at = false, ...rest }) => {
		const restValues = rest ? Object.values(rest) : false;
		const restAttributes = restValues
			? restValues.map((el, i) => (
				<span key={i}>{el}</span>
			)) : '';
		return (
			<Fragment>
				<p>
					{created_at ? moment.unix(created_at)
						.format('DD.MM.YYYY') : ''} {updated_at ? moment.unix(updated_at)
						.format('DD.MM.YYYY') : ''} {restAttributes}
				</p>
				<br />
			</Fragment>
		)
	})
};

const ArrayCell = ({ values, type, delimiter, style, isHtml, dateFormat }) => {
	if (!Array.isArray(values) || !values.length) return null;

	return values.map((value, index) => (
		<span style={isHtml && style ? style : null}>
			{isHtml ? <span dangerouslySetInnerHTML={{ __html: value }} /> : ''}
			{!isHtml && renderer(value, type, dateFormat)}
			{index < (values.length - 1) && delimiter}
		</span>
	))
};

const renderer = (value, type, dateFormat) => {
	switch (type) {
	case 'date':
		return moment.unix(value).format(dateFormat || 'DD.MM.YYYY');
	case 'array_ext':
		return ArrayCell(value);
	default:
		return value;
	}
};

export {
	DateCell,
	TextCell,
	ArrayCell,
	ArrTextCell,
	ArrObjectCell,
	ActionsCell,
	BooleanCell,
	HtmlCell
};
