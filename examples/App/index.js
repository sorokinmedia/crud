import 'antd/dist/antd.css';
import PropTypes from 'prop-types'
import React from 'react';
import { connect } from 'react-redux'
import { CrudFull } from '../../lib/index';
import FormFields from './FormFields'
import moment from 'moment'
// import createCommissionFields from './../createObjectTypeFields'

// commission_list_container

function App({ roles, groups }) {
	return (
		<div className="box box-body crud-table">
			<CrudFull
				crudRead="/v2/admin/site-alert/list"
				crudCreate="/v2/admin/site-alert"
				modelName="siteAlerts"
				isView
				createDisabled={false}
				createButtonTitle="Добавить"
				createFormOptions={{
					fields: FormFields.map((elem) => {
						console.log(elem)
						if (elem.name === 'role') {
							return {
								...elem,
								options: roles
							}
						}
						if (elem.name === 'group_id') {
							return {
								...elem,
								options: groups,
							}
						}
						return elem
					}),
					title: 'Добавить алерт',
					editTitle: 'Редактировать алерт',
				}}
				submitShape={form => {
					console.log(form)
					return {
						SiteAlert: {
							...form,
							name: form.name,
							text: form.text,
							image: form.image,
							role: form.role,
							view_count_to_close: form.view_count_to_close,
							finish_date: Number(moment(form.finish_date, 'DD/MM/YYYY')
								.format('x') / 1000),
							group_id: form.group_id,
							order_id: form.order_id,
						}
					}
				}}
				updateShape={form => {
					console.log(form)
					return {
						name: form.name,
						text: form.text,
						image: form.image,
						role: form.role.id,
						view_count_to_close: form.view_count_to_close,
						finish_date: moment(form.finish_date * 1000)
							.format('DD/MM/YYYY'),
						group_id: (form.group) ? form.group.id : undefined,
						order_id: form.order_id,
					}
				}}
				size="middle"
				fixActionColumn
			/>
		</div>
	)
}

App.propTypes = {
	roles: PropTypes.array,
	groups: PropTypes.array,
}

export default connect(state => ({
	roles: state.crudFilterValues && state.crudFilterValues.siteAlerts
		? state.crudFilterValues.siteAlerts.role
		: [],
	groups: state.crudFilterValues && state.crudFilterValues.siteAlerts
		? state.crudFilterValues.siteAlerts.group
		: [],
}), {})(App)
