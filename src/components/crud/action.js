import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Icon } from 'antd';

import styled from 'styled-components';

const ActionStyled = styled.span`
	.crud-action {
		font-size: 20px
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
    	default:
    		return ''
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
		const { data, row, iconTheme } = this.props;

		console.log(iconTheme)

		return (<p>
			<ActionStyled>
				<a title={data.name} href={data.url} target="_blank" className="crud-action">
					<Icon type={this.getIcon(data.id)} onClick={this.handleClick} />
				</a>
			</ActionStyled>
		</p>)
	}
}

Action.propTypes = {
	data: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired,
	modelName: PropTypes.string,
	iconTheme: PropTypes.string
};

Action.defaultProps = {
	iconTheme: 'outlined'
}

export default connect((state, props) => ({ actionsFunc: state.crudActionsFunc[props.modelName] }), { push })(Action)
