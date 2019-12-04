import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import actions from '../redux/actions';

const useModal = ({ modelName }) => {
	const dispatch = useDispatch();
	const isModalOpen = useSelector(state => state.isOpenModelModal);
	const objectModal = useSelector(state => state.modelModalForm);

	const toggleModal = () => {
		dispatch(actions.toggleCreateModelModal(modelName));
	};

	return {
		toggleModal,
		objectModal,
		isModalOpen
	}
};

export default useModal
