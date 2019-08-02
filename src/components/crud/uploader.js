import React from 'react'
import PropTypes from 'prop-types'
import Uploader from '../custom/Uploader';
import { connect } from 'react-redux'
import actions from '../../redux/actions'

const { setUploaderFiles } = actions;

function CrudUploader(props) {
	return (
		<Uploader
			{...props}
			onChange={files => props.setUploaderFiles(files, props.modelName)}

		/>
	);
}

CrudUploader.propTypes = {
	setUploaderFiles: PropTypes.func.isRequired,
	modelName: PropTypes.string.isRequired
};

export default connect(state => ({ modelName: state.isOpenModelModal }), { setUploaderFiles })(CrudUploader)
