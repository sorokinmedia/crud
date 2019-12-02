import React, { Component, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../redux/actions';
import CrudView from './view/crudView'
import CreateModel from './create/createModelPopup'
import CreateModelView from './create/createModelPage'
import ShowModelView from './view/modelView'
import { Button } from 'antd/lib/index';
import '../../style.css'

const {
	toggleCreateModelModal,
	deleteModel,
	restoreModel,
	createModel,
	changeModel,
	setModelModalForm,
	setCrudActionsFunc,
	setCrudParams
} = actions;

const CrudFull = (props) => {
	const openUpdateFrom = (action, elem) => {
		props.setModelModalForm('edit', elem, action);
		toggleModal(props.modelName);
	};
	const openViewFrom = (action, elem) => {
		props.setModelModalForm('view', elem, action);
		toggleModal(props.modelName);
	};
	const toggleModal = (modelName) => {
		props.toggleCreateModelModal(modelName);
	};
	const handleClose = () => {
		toggleModal();
		props.setModelModalForm(null, null);
	};
	const handleUpdate = (form) => {
		props.changeModel(form, props.objectModal.action, props.modelName)
	};
	const handleCreate = (form) => {
		props.createModel(form, props.crudCreate, props.modelName)
	};
	const handleDelete = (action, elem) => {
		const conf = window.confirm(props.onDeleteConfirmMessageFunc(elem));

		if (conf) props.deleteModel(elem.id, action, props.modelName)
	};
	const handleRestore = (action, elem) => {
		const conf = window.confirm(`Хотите восстановить "${elem.name}" (ID: ${elem.id})?`);

		if (conf) props.restoreModel(elem.id, action.url, props.modelName)
	};
	const actionsFunc = (action, elem) => {
		const { customActionsFunc } = props;

		switch (action.id) {
		case 'update':
			openUpdateFrom(action, elem);
			break;
		case 'view':
			openViewFrom(action, elem);
			break;
		case 'delete':
			handleDelete(action, elem);
			break;
		case 'restore':
			handleRestore(action, elem);
			break;
		default:
			return customActionsFunc ? customActionsFunc(action, elem) : null;
		}
	};
	useEffect(() => {
		props.setCrudActionsFunc(actionsFunc, props.modelName);
		props.setCrudParams({
			crudRead: props.crudRead,
			crudCreate: props.crudCreate,
			modelName: props.modelName,
			submitShape: props.submitShape,
			initialValues: props.initialValues,
			iconsProvider: props.iconsProvider,
			uploadFilesSettings: props.uploadFilesSettings
		})
	}, [])
};

export default connect(state => ({
	objectModal: state.modelModalForm,
	isModalOpen: state.isOpenModelModal,
}), {
	toggleCreateModelModal,
	deleteModel,
	restoreModel,
	createModel,
	changeModel,
	setModelModalForm,
	setCrudActionsFunc,
	setCrudParams
})(CrudFull)
