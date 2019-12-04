import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd';

const CreateButton = ({
	createDisabled, btnStyle, createButtonLabel, modelName, ButtonComponent
}) => {
	const Btn = ButtonComponent || Button;

	return !createDisabled ?
		(
			<Btn
				type="primary"
				name="createButton"
				onClick={() => this.toggleModal(modelName)}
				style={{
					...btnStyle,
					marginBottom: '20px'
				}}
			>
				{createButtonLabel}
			</Btn>)
		: null;
};

CreateButton.propTypes = {
	createDisabled: PropTypes.bool.isRequired,
	btnStyle: PropTypes.object,
	createButtonLabel: PropTypes.string,
	modelName: PropTypes.string.isRequired,
	ButtonComponent: PropTypes.element
};

CreateButton.defaultProps = {
	createButtonLabel: 'Добавить',
	btnStyle: {},
	ButtonComponent: null
};

export default CreateButton;
