import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CrudFull } from '../../src';
import createCategoryFields from './createCategoryFields';
import { Select } from 'antd'
// admin_skill_additional_container

function CrudAdminSkillAdditional(props) {

	const options = [{
		value: 0,
		label: 'Нет'
	}, {
		value: 1,
		label: 'Да'
	}]
	const handleChange = (ev) => {
		console.log('handleChange', ev)
	}

	const handleSearch = (ev) => {
		console.log('handleSearch', ev)
	}

	return (
		<div className="box box-body crud-table">
			<Select
				onChange={handleChange}
				onSearch={handleSearch}
				placeholder="Выбрать"
				options={options}
			/>
			<CrudFull
				crudRead="/v2/admin/skill-additional/list"
				crudCreate="/v2/admin/skill-additional"
				modelName="adminSkill"
				createDisabled={false}
				createFormOptions={{
					fields: createCategoryFields.map((elem) => {
						if (elem.name === 'main_skill_id') {
							return {
								...elem,
								options: props.skill
							}
						}
						return elem
					}),
					title: 'Добавить дополнительный навык',
					editTitle: 'Редактировать дополнительный навык',
				}}
				initialModal={{
					is_active: 0,
				}}
				submitShape={form => ({
					SkillAdditional: {
						...form,
						name: form.name,
						main_skill_id: form.main_skill_id,
						prices: form.prices,
						is_active: form.is_active ? 1 : 0,
					}
				})}
				updateShape={form => ({
					name: form.name,
					main_skill_id: form.main_skill.id,
					prices: form.prices,
					is_active: form.is_active ? 1 : 0,
				})}
			/>
		</div>
	)
}

CrudAdminSkillAdditional.propTypes = {
	skill: PropTypes.array,
};

export default connect(state => ({
	all: state.crudFilterValues,
	parent: state.crudFilterValues && state.crudFilterValues.adminSkill
		? state.crudFilterValues.adminSkill.parent
		: [],
	skill: state.crudFilterValues && state.crudFilterValues.adminSkill
		? state.crudFilterValues.adminSkill.main_skill
		: [],
}))(CrudAdminSkillAdditional)
