import { Button, Col, Row, Typography } from 'antd';
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../../helpers/renderField'
import { Form, Input } from 'antd'

class CreateViewForm extends Component {

	static propTypes = {
		modalType: PropTypes.string,
		onClose: PropTypes.func.isRequired,
		onCreate: PropTypes.func.isRequired,
		title: PropTypes.string,
		titleEdit: PropTypes.string,
		fields: PropTypes.array.isRequired,
		renderField: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.object
		])
	};

	static defaultProps = {
		renderField
	};

	componentDidMount() {

	}

	handleCancel = () => this.props.onClose()

	handleSubmit = form => this.props.onCreate(form)


	mapFields = (fields) => {
		if (fields.length) {
			return fields.map(elem => (
				<Form key={elem.name}>
					<Form.Item label={elem.placeholder}>
						<Input type="text" disabled value={this.props.initialValues[elem.name]} />
					</Form.Item>
				</Form>))
		}
		return null
	}

	render() {
		const { fields } = this.props;
		const { Title } = Typography
		return (
			<Row align="middle" justify="space-between">
				<Col span={20}>
					<Title level={2}>Просмотр алерта</Title>
					{this.mapFields(fields)}
				</Col>
				<Col span={20} style={{ textAlign: 'right' }}>
					<Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>Назад</Button>
				</Col>
			</Row>
		)
	}
}

CreateViewForm.propTypes = {
	type: PropTypes.string,
	options: PropTypes.object,
	handleSubmit: PropTypes.func,
}

CreateViewForm = reduxForm({
	form: 'createModel',
	validate: (values, props) => {
		let errors = {};
		// if(!values.name) errors.name = 'Введите название';
		props.fields.forEach(field => {
			if (field.validateFunc) errors = field.validateFunc(values, errors)
		});

		return errors;
	}
})(CreateViewForm);

CreateViewForm = connect((state, props) => {
	const options = props.fields.reduce((acc, field) => {
		if (state[field.optionsKey]) {
			acc[field.optionsKey] = state[field.optionsKey].data
		}

		return acc;
	}, {});

	return {
		crudCreateModalLoading: state.crudCreateModalLoading,
		options
	}
}, {})(CreateViewForm);

export default CreateViewForm
