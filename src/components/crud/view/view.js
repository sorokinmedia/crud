import React from 'react'
import PropTypes from 'prop-types';
import ShowModelView from './modelView';
import CreateModelView from '../create/createModelPage';

const View = ({
	title, titleEdit, objectModal, updateShape, initialModal, createDisabled, fields, renderField
}) => {
	if (objectModal.modalType === 'view')
		return (
			<ShowModelView
				title={title || 'Создать'}
				titleEdit={titleEdit || 'Редактировать'}
				type={objectModal.modalType}
				onClose={this.handleClose}
				fields={fields}
				initialValues={objectModal.initialValues
					? updateShape(objectModal.initialValues)
					: initialModal || {}
				}
				renderField={renderField}
			/>);
	if (!createDisabled)
		return (
			<CreateModelView
				title={title || 'Создать'}
				titleEdit={titleEdit || 'Редактировать'}
				type={objectModal.modalType}
				onClose={this.handleClose}
				onCreate={objectModal.modalType === 'edit' ? this.handleUpdate : this.handleCreate}
				fields={fields}
				initialValues={objectModal.initialValues
					? updateShape(objectModal.initialValues)
					: initialModal || {}
				}
				renderField={renderField}
			/>);

	return null;
};

View.propTypes = {
	title: PropTypes.string,
	titleEdit: PropTypes.string,
	objectModal: PropTypes.object.isRequired,
	updateShape: PropTypes.func,
	initialModal: PropTypes.object,
	createDisabled: PropTypes.bool.isRequired,
	fields: PropTypes.object,
	renderField: PropTypes.func
};

View.defaultProps = {
	title: 'Создать',
	titleEdit: 'Редактировать',
	updateShape: () => {},
	initialModal: {},
	fields: {},
	renderField: () => {}
};

export default View
