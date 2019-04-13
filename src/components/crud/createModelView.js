import { Button, Col, Row, Typography } from 'antd';
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../../helpers/renderField'

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

	static defaultProps = { renderField };

	handleCancel = () => this.props.onClose();

	handleSubmit = form => this.props.onCreate(form);


	mapFields = fields => fields.map(props => props.fields
		? <div key={props.name}>{this.mapFields(props.fields)}</div>
		: <Field
			{...props}
			component={props.component || this.props.renderField}
			key={props.name}
			options={this.props.options[props.optionsKey] || props.options || []}
		/>);

	render() {
		const { type, title, titleEdit, fields } = this.props;
		const { Title } = Typography;
		return (
			<Row align="middle" justify="space-between">
				<Col span={20}>
					<Button
						size="small"
						type="primary"
						ghost
						onClick={this.handleCancel}
						htmlType="button"
					>
						Назад
					</Button>
					<Title level={2}>{type === 'edit' ? titleEdit : title}</Title>
					<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
						{this.mapFields(fields)}
					</form>
				</Col>
				<Col span={20} style={{ textAlign: 'right' }}>
					<Button type="primary" htmlType="submit" onClick={this.props.handleSubmit(this.handleSubmit)}>
						Отправить
					</Button>
					<Button style={{ marginLeft: 8 }} onClick={this.handleCancel} htmlType="button">Отмена</Button>
				</Col>
			</Row>
		)
	}
}

CreateViewForm.propTypes = {
	type: PropTypes.string,
	options: PropTypes.object,
	handleSubmit: PropTypes.func,
};

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
