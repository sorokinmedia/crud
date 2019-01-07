import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Icon } from 'antd'

import styled from 'styled-components';

const ActionStyled = styled.span`
	.crud-action {
		font-size: 20px;
		padding: 0 5px;
	}
`;

class Action extends Component {

    getIcon = (id) => {
    	switch (id) {
	        case 'update':
	            return 'edit';
	        case 'delete':
	            return 'delete';
	        case 'create':
	            return 'plus-circle';
	        case 'restore':
	            return 'select';
	        case 'view-back':
	        case 'view':
	            return 'eye';
	        case 'check':
	            return 'user';
	        case 'took':
	            return 'login';
	        case 'return':
	            return 'logout';
	        case 'finish':
	            return 'check-circle';
	        case 'logs':
	            return 'form';
		    case 'transfer':
			    return 'switcher';
	        default:
	            return this.props.iconsProvider(id)
    	}
    };

	handleClick = (ev) => {
		const { data, row } = this.props;

		switch (data.type) {
		case 'query':
			ev.preventDefault();
			this.props.actionsFunc(data, row);
			break;
		case 'link':
			if (data.method === '_blank') return null;
			ev.preventDefault();
			this.props.push(data.url);
			break;
		default:
			return null;
		}
	};

	render() {
		const { data, row } = this.props;

		return (<ActionStyled>
			<a title={data.name} href={data.url} target="_blank" className="crud-action">
				<Icon type={this.getIcon(data.id) || data.icon} onClick={this.handleClick} />
			</a>
		</ActionStyled>)
	}
}

Action.propTypes = {
	data: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired,
	modelName: PropTypes.string,
	iconTheme: PropTypes.string,
	iconsProvider: PropTypes.func
};

Action.defaultProps = { iconTheme: 'outlined' }

export default connect((state, props) => ({
	actionsFunc: state.crudActionsFunc[props.modelName],
	params: state.crudParams[props.modelName]
}), {
	push
})(Action)
