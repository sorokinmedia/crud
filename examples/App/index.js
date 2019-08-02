import 'antd/dist/antd.css';
import PropTypes from 'prop-types'
import React from 'react';
import { connect } from 'react-redux'
import { CrudFull } from '../../src/index';
import { Button } from 'antd'
// import { CrudFull } from '../../lib/index';
import FormFields from './FormFields/index'
import moment from 'moment'
import {API} from "../redux/sagas";
import {getCookie} from "../../src/redux/requestSaga";
// import createCommissionFields from './../createObjectTypeFields'

// commission_list_container

class CrudSiteAlerts extends React.Component {

	constructor(props) {
		super(props);

		this.state = { selected: [] }
	}


	actionsFunc = (action, elem) => {
		switch (action.id) {
		case 'start':
			const conf = window.confirm('Начать показ алерта?');
			if (conf) this.props.startShowSiteAlert(elem.id);
			break;
		default:
			return null;
		}
	};

	iconSet = (id) => {
		switch (id) {
		case 'start':
			return 'caret-right'
		default:
			return null;
		}
	};

	render() {
		const { roles, groups, start } = this.props;
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({ selected: [...this.state.selected, ...selectedRowKeys] });
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			}),
		};

		return (
			<div className="box box-body crudTable">

				<CrudFull
					crudRead={`/v1/owner/contractor`}
					crudCreate={'/v1/owner/contractor/create'}
					//uploadFilesSettings={{ url: API + '/v1/common/file', token: getCookie('auth_token') }}
					createDisabled={false}
					createFormOptions={{ fields: FormFields }}
					modelName="billList"
					createButtonTitleId="sidebar.contractor.work.new"
					ButtonComponent={Button}
					customActionsFunc={this.actionsFunc}
					onDeleteConfirmMessageFunc={() => 'Удалить запись?'}
					fixActionColumn={false}
					rowSelection={rowSelection}
				/>
			</div>
		)
	}
}

CrudSiteAlerts.propTypes = {
	start: PropTypes.object,
	roles: PropTypes.array,
	groups: PropTypes.array,
	startShowSiteAlert: PropTypes.func,
	clearStartShowSiteAlert: PropTypes.func,
}

export default connect(state => ({
	// start: state[moduleName + START_SHOW_SITE_ALERT_RESPONSE],
	roles: state.crudFilterValues && state.crudFilterValues.siteAlerts
		? state.crudFilterValues.siteAlerts.role
		: [],
	groups: state.crudFilterValues && state.crudFilterValues.siteAlerts
		? state.crudFilterValues.siteAlerts.group
		: [],

}))(CrudSiteAlerts)
