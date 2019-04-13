import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { renderField } from '../../helpers/renderField'
import actions from '../../redux/actions';
import CrudView from './crudView'
import CreateModel from './createModel'
import CreateModelView from './createModelView'
import { Button } from 'antd';
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

export class CrudFull extends Component {

	static propTypes = {
		crudCreate: PropTypes.string,
		crudRead: PropTypes.string.isRequired,
		modelName: PropTypes.string.isRequired,
		customActionsFunc: PropTypes.func,
		createButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
		createFormOptions: PropTypes.shape({ fields: PropTypes.array.isRequired }),
		submitShape: PropTypes.func,
		updateShape: PropTypes.func,
		getChildrenUrl: PropTypes.func,
		createDisabled: PropTypes.bool,
		isView: PropTypes.bool,
		btnStyle: PropTypes.object,
		ButtonComponent: PropTypes.object,
		tableStyle: PropTypes.object,
		tableWrapper: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
		fixActionColumn: PropTypes.bool,
		iconTheme: PropTypes.string,
		size: PropTypes.string,
		tdClass: PropTypes.string,
		initialModal: PropTypes.object,
		iconsProvider: PropTypes.func,
		restoreModel: PropTypes.func.isRequired,
		setCrudActionsFunc: PropTypes.func.isRequired,
		setCrudParams: PropTypes.func.isRequired,
		scrollX: PropTypes.number,
		pageSize: PropTypes.number,
		initialValues: PropTypes.object
	};

	static defaultProps = {
		createButtonTitle: 'Добавить',
		submitShape: form => form,
		updateShape: elem => elem,
		createDisabled: true,
		btnStyle: {},
		tableStyle: {},
		tableWrapper: null,
		iconTheme: 'outline',
		size: 'default',
		iconsProvider: () => '',
		pageSize: 20
	};

	componentDidMount() {
		this.props.setCrudActionsFunc(this.actionsFunc, this.props.modelName);
		this.props.setCrudParams({
			crudRead: this.props.crudRead,
			modelName: this.props.modelName,
			submitShape: this.props.submitShape,
			initialValues: this.props.initialValues,
			iconsProvider: this.props.iconsProvider
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
		this.toggleModal(this.props.modelName);
	};

	toggleModal = (modelName) => {
		this.props.toggleCreateModelModal(modelName);
	};

	handleClose = (modelName) => {
		this.toggleModal();
		this.props.setModelModalForm(null, null);
	};

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
			updateShape,
			iconTheme,
			getChildrenUrl,
			ButtonComponent,
			size,
			tdClass,
			initialModal,
			scrollX,
			isView,
			pageSize
		} = this.props;

		const { title, titleEdit, fields } = createFormOptions || {};
		const Btn = ButtonComponent || Button;

		if (isView && isModalOpen === modelName && !createDisabled) {
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
				/>
			)
		}

		return (
			<div>
				{!createDisabled ? (
					<Btn
						type="primary"
						name="createButton"
						onClick={() => this.toggleModal(modelName)}
						style={{
							...btnStyle,
							marginBottom: '20px'
						}}
					>
						{createButtonTitle}
					</Btn>
				) : null}

				<CrudView
					modelName={modelName}
					url={crudRead}
					tableStyle={tableStyle}
					TableWrapper={tableWrapper}
					fixActionColumn={fixActionColumn}
					iconTheme={iconTheme}
					getChildrenUrl={getChildrenUrl}
					size={size}
					tdClass={tdClass}
					scrollX={scrollX}
					pageSize={pageSize}
				/>
				{isModalOpen === modelName && !createDisabled ? (
					<CreateModel
						title={title || 'Создать'}
						titleEdit={titleEdit || 'Редактировать'}
						modalType={objectModal.modalType}
						onClose={this.handleClose}
						onCreate={objectModal.modalType === 'edit' ? this.handleUpdate : this.handleCreate}
						fields={fields}
						initialValues={objectModal.initialValues
							? updateShape(objectModal.initialValues)
							: initialModal || {}
						}
					/>
				) : ''}
			</div>
		)
	}
}

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
