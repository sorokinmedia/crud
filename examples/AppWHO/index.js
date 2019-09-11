import { Modal } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CrudFull } from '../../src';
import createCategoryFields from './createCategoryFields';

// promo_codes_container

class CrudPromocodeCategories extends Component {

	state = {
		stat: false,
		operations: false
	}

	showStatModal = () => this.setState({ stat: true, })

	showOperationsModal = () => this.setState({ operations: true, })

	handleStatOk = () => this.setState({ stat: false, })

	handleOperationsOk = () => this.setState({ operations: false, })

	handleStatCancel = () => this.setState({ stat: false, })

	handleOperationsCancel = () => this.setState({ operations: false, })

	actionsFunc = (action, elem) => {
		console.log('this.props', action, elem)

		switch (action.id) {
		case 'operations':
			this.setState({ id: elem.id })
			this.showOperationsModal()
			break
		case 'stat':
			this.setState({ id: elem.id })
			this.showStatModal()
			break
		default:
			return null;
		}
	};

	iconSet = (id) => {
		switch (id) {
		case 'operations':
			return 'right-square'
		case 'stat':
			return 'bar-chart'
		default:
			return null;
		}
	};

	render() {
		console.log('this.props', this.props)
		return (
			<div className="box box-body crud-table">
				<CrudFull
					crudRead="/v2/admin/promo-code/list"
					crudCreate="/v2/admin/promo-code"
					modelName="promocode"
					customActionsFunc={this.actionsFunc}
					iconsProvider={this.iconSet}
					createDisabled={false}
					fixActionColumn
					size="middle"
					createFormOptions={{
						fields: createCategoryFields.map((elem) => {
							if (elem.name === 'cat_id') {
								return {
									...elem,
									options: this.props.cat
								}
							}
							if (elem.name === 'beneficiary_id') {
								return {
									...elem,
									options: this.props.beneficiary
								}
							}
							return elem
						}),
						title: 'Добавить категорию',
						editTitle: 'Редактировать категорию',
					}}
					initialModal={{
						is_available_old: 0,
					}}
					submitShape={form => ({
						PromoCodeForm: {
							...form,
							value: form.value,
							title: form.title,
							description: form.description,
							cat_id: form.cat_id,
							beneficiary_id: form.beneficiary_id,
							date_from: moment(form.date_from, 'DD/MM/YYYY')
								.unix(),
							date_to: moment(form.date_to, 'DD/MM/YYYY')
								.unix(),
							sum_promo: form.sum_promo,
							sum_recharge: form.sum_recharge,
							discount_fixed: form.discount_fixed,
							discount_percentage: form.discount_percentage,
							is_available_old: form.is_available_old ? 1 : 0,
						}
					})}
					updateShape={form => ({
						value: form.value,
						title: form.title,
						description: form.description,
						cat_id: form.cat.id,
						beneficiary_id: form.beneficiary.id,
						date_from: moment.unix(form.date_from)
							.format('DD/MM/YYYY'),
						date_to: moment.unix(form.date_to)
							.format('DD/MM/YYYY'),
						sum_promo: form.sum_promo,
						sum_recharge: form.sum_recharge,
						discount_fixed: form.discount_fixed,
						discount_percentage: form.discount_percentage,
						is_available_old: form.is_available_old ? 1 : 0,
					})}
					getChildrenUrl={id => `/v2/admin/promo-code/${id}/child`}
				/>

			</div>
		)
	}
}

CrudPromocodeCategories.propTypes = {
	cat: PropTypes.array,
	beneficiary: PropTypes.array,
	getPromoCodeAction: PropTypes.func
};

export default connect(state => ({
	all: state.crudFilterValues,
	cat: state.crudFilterValues && state.crudFilterValues.promocode
		? state.crudFilterValues.promocode.cat
		: [],
	beneficiary: state.crudFilterValues && state.crudFilterValues.promocode
		? state.crudFilterValues.promocode.beneficiary
		: [],
}))(CrudPromocodeCategories)
