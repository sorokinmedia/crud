import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux'
import { CrudFull } from '../../src/index';
import createCommissionFields from './../createObjectTypeFields'

// commission_list_container

function App({ taskType, userTag }) {
	//console.log(taskType, userTag)
	return (
		<div className="box box-body crud-table">
			<CrudFull
				crudRead="/v1/owner/tenant/list"
				crudCreate="/v2/admin/task/commission"
				modelName="crudCommisionList"
				createDisabled={false}
				// createButtonTitleId={"sidebar.contractor.work.new"}
				createFormOptions={{
					fields: createCommissionFields.map((elem) => {
						if (elem.name === 'task_type_id') {
							return {
								...elem,
								options: taskType
							}
						}
						if (elem.name === 'user_tag_id') {
							return {
								...elem,
								options: userTag,
							}
						}
						return elem
					}),
					title: 'Добавить данные',
					editTitle: 'Редактировать данные',
				}}

				submitShape={form => ({
					TaskCommission: form,
				})}
				updateShape={form => ({
					task_type_id: form.task_type.id,
					user_tag_id: form.user_tag.id,
					commission_task: form.commission_task,
					commission_check: form.commission_check
				})}
				fixActionColumn={false}
				pageSize={5}
				CustomButtons={() => <span>HELLO</span>}
			/>
		</div>
	)
}


export default connect(state => {
	//console.log(state.crudFilterValues)
	return {
		taskType: state.crudFilterValues && state.crudFilterValues.crudCommisionList
			? state.crudFilterValues.crudCommisionList.task_type
			: [],
		userTag: state.crudFilterValues && state.crudFilterValues.crudCommisionList
			? state.crudFilterValues.crudCommisionList.user_tag
			: [],
	}
})(App)


App.propTypes = {};
App.defaultProps = {};
