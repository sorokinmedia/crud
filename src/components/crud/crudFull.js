import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../redux/actions';
import CrudView from './crudView'
import CreateModelView from './createModel'
import { Button } from 'antd';

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

class CrudFull extends Component {

	componentDidMount() {
		this.props.setCrudActionsFunc(this.actionsFunc, this.props.modelName);
		this.props.setCrudParams({
			crudRead: this.props.crudRead,
			modelName: this.props.modelName,
			submitShape: this.props.submitShape
		})
	}

	actionsFunc = (action, elem) => {
		const { customActionsFunc } = this.props;
		switch (action.id) {
		case 'update':
			this.openUpdateFrom(action, elem);
			break;
		case 'delete':
			this.handleDelete(action, elem);
			break;
		case 'restore':
			this.handleRestore(action, elem);
			break;
		default:
			return customActionsFunc ? customActionsFunc(action, elem) : null;
		}
	};


	openUpdateFrom = (action, elem) => {
		this.props.setModelModalForm('edit', elem, action);
		this.toggleModal();
	};

	toggleModal = () => {
		this.props.toggleCreateModelModal();
	};

	handleClose = () => {
		this.toggleModal();
		this.props.setModelModalForm(null, null);
	};

	render() {
		const {
			objectModal,
			isModalOpen,
			modelName,
			crudRead,
			createButtonTitle,
			createFormOptions,
			createDisabled,
			btnStyle,
			tableStyle,
			tableWrapper,
			fixActionColumn,
			updateShape
		} = this.props;

		const { title, titleEdit, fields } = createFormOptions || {};

		return (<div>
			{!createDisabled ? <Button
				type="primary"
				onClick={this.toggleModal}
				style={{ ...btnStyle, marginBottom: '20px' }}
			>
				{createButtonTitle}
                      </Button> : null}
			<CrudView
				modelName={modelName}
				url={crudRead}
				tableStyle={tableStyle}
				TableWrapper={tableWrapper}
				fixActionColumn={fixActionColumn}
			/>
			{isModalOpen && !createDisabled ? <CreateModelView
				title={title || 'Создать'}
				titleEdit={titleEdit || 'Редактировать'}
				modalType={objectModal.modalType}
				onClose={this.handleClose}
				onCreate={objectModal.modalType === 'edit' ? this.handleUpdate : this.handleCreate}
				fields={fields}
				initialValues={objectModal.initialValues ? updateShape(objectModal.initialValues) : {}}
			/> : '' }
          </div>)
	}

	handleUpdate = (form) => {
		this.props.changeModel(form, this.props.objectModal.action, this.props.modelName)
	};

	handleCreate = (form) => {
		this.props.createModel(form, this.props.crudCreate, this.props.modelName)
	};

	handleDelete = (action, elem) => {
		const conf = window.confirm(`Хотите удалить "${elem.name}" (ID: ${elem.id})?`);

		if (conf) this.props.deleteModel(elem.id, action.url, this.props.modelName)
	};

	handleRestore = (action, elem) => {
		const conf = window.confirm(`Хотите восстановить "${elem.name}" (ID: ${elem.id})?`);

		if (conf) this.props.restoreModel(elem.id, action.url, this.props.modelName)
	};
}

CrudFull.propTypes = {
	crudCreate: PropTypes.string,
	crudRead: PropTypes.string.isRequired,
	modelName: PropTypes.string.isRequired,
	customActionsFunc: PropTypes.func,
	createButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
	createFormOptions: PropTypes.shape({ fields: PropTypes.array.isRequired }),
	submitShape: PropTypes.func,
	updateShape: PropTypes.func,
	createDisabled: PropTypes.bool,
	btnStyle: PropTypes.object,
	tableStyle: PropTypes.object,
	tableWrapper: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	fixActionColumn: PropTypes.bool
};

CrudFull.defaultProps = {
	createButtonTitle: 'Добавить',
	submitShape: form => form,
	updateShape: elem => elem,
	createDisabled: true,
	btnStyle: {},
	tableStyle: {},
	tableWrapper: null
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
