import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'redux'
import actions from '../../../redux/actions'
import UploaderFilePreview from "../../crud/uploaderFilePreview";

const { setUploaderDefaultFileList } = actions;

const UploadDecorator = UploaderComponent => class Uploader extends Component {

	constructor(props) {
		super(props);
		// unnessasary without using fileList parameter
		this.state = {
			fileList: [],
			preview: null
		};
	}

	validateType = (type) => {
		switch (type) {
		case 'image/jpeg':
		case 'image/jpg':
		case 'image/png':
			return true;
		default:
			return false
		}
	};

	setPreview = (id) => {
		this.setState({ preview: id })
	};

	render() {
		const listType = this.props.listType || 'text';
		const multiple = this.props.multiple || false;
		const buttonText = this.props.buttonText || undefined;
		const { fileList, preview } = this.state;
		const { fileListStored, defaultFileListStored } = this.props;

		const uploaderProps = {
			// if removing file was set as default we catch it and remove from default in store
			// else removing from component state (unnessasary without using fileList parameter) and provide
			// to onChange handled array
			onRemove: (file) => {
				this.setState((state) => {
					if (file.old) {
						const newDefaultFileList = defaultFileListStored.filter(f => f.uid !== file.uid);
						this.props.setUploaderDefaultFileList(newDefaultFileList, this.props.modelName);

						return state;
					}

					const index = state.fileList.indexOf(file);
					const newFileList = state.fileList.slice();

					newFileList.splice(index, 1);
					this.props.onChange(newFileList);

					return { fileList: newFileList };
				});
			},
			beforeUpload: (file) => {
				if (!this.validateType(file.type)) {
					return message.error('Ошибка загрузки, только JPG, JPEG и PNG')
				}
				if (file.size > 9999999) {
					return message.error('Ошибка загрузки, изображение превышает 10MB')
				}
				this.setState((state) => {
					const newFileList = !multiple ? [file] : [...state.fileList, file];

					this.props.onChange(newFileList);

					return {
						fileList: newFileList,
						src: window.URL.createObjectURL(file)
					}
				});
				return false;
			},
			onPreview: file => this.setPreview(file.uid),
			/* fileList: fileList
				.map(f => ({
					url: window.URL.createObjectURL(f),
					name: f.name,
					uid: f.uid,
					lastModified: f.lastModified,
					lastModifiedDate: f.lastModifiedDate,
					size: f.size,
					type: f.type,
					webkitRelativePath: f.webkitRelativePath
				})).concat(this.props.defaultFileList || []), */
			listType,
			buttonText
		};

		if (this.props.defaultFileList) uploaderProps.defaultFileList = this.props.defaultFileList;

		return (
			<div>
				<UploaderComponent {...uploaderProps} />
				<UploaderFilePreview setPreview={this.setPreview} preview={preview} files={defaultFileListStored.concat(fileListStored)} />
			</div>
		);
	}
};

UploadDecorator.propTypes = {
	onChange: PropTypes.func.isRequired,
	setUploaderDefaultFileList: PropTypes.func.isRequired,
	modelName: PropTypes.string.isRequired,
	listType: PropTypes.string,
	multiple: PropTypes.bool,
	defaultFileList: PropTypes.array,
	defaultFileListStored: PropTypes.array,
};

const mapStateToProps = (state, props) => {
	const { uploaderFiles } = state;
	const { modelName } = props;
	const uploaderModelFiles = uploaderFiles && uploaderFiles[modelName] ? uploaderFiles[modelName] : {};

	return {
		defaultFileListStored: uploaderModelFiles.defaultFileList || [],
		fileListStored: uploaderModelFiles.fileList || [],
	}
};

export default compose(
	connect(mapStateToProps, { setUploaderDefaultFileList }),
	UploadDecorator
)
