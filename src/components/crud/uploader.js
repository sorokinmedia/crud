import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Uploader from '../custom/Uploader';
import { connect } from 'react-redux'
import actions from '../../redux/actions'

const { setUploaderFiles, setUploaderDefaultFileList } = actions;

function CrudUploader(props) {
	useEffect(() => {
		props.setUploaderDefaultFileList(props.defaultFileList, props.modelName)
	}, []);
	console.log(props)
	return (
		<Uploader
			{...props}
			onChange={files => props.setUploaderFiles(files, props.modelName)}
		/>
	);
}

CrudUploader.propTypes = {
	setUploaderFiles: PropTypes.func.isRequired,
	modelName: PropTypes.string.isRequired,
	setUploaderDefaultFileList: PropTypes.func.isRequired,
	defaultFileList: PropTypes.array
};

export default connect(
	state => ({ modelName: state.isOpenModelModal }),
	{
		setUploaderFiles,
		setUploaderDefaultFileList
	}
)(CrudUploader)
