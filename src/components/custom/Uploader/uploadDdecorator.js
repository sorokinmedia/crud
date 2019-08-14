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
			fileList: props.defaultFileList || [],
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
			onRemove: (file) => {
				this.setState((state) => {
					const newFileList = state.fileList.filter(f => f.uid !== file.uid);

					this.props.onChange(newFileList);

					return { fileList: newFileList };
				});
			},
			accept: '.jpg, .jpeg, .png',
			beforeUpload: (file) => {
				if (!this.validateType(file.type)) {
					message.error('Ошибка загрузки, только JPG, JPEG и PNG');
					return false;
				}
				if (file.size > 9999999) {
					message.error('Ошибка загрузки, изображение превышает 10MB');
					return false;
				}
				this.setState((state) => {
					const newFileList = !multiple ? [file] : [...state.fileList, file];

					this.props.onChange(newFileList);

					return {
						fileList: newFileList,
						src: window.URL.createObjectURL(file)
					}
				});

				return false
			},
			onPreview: file => this.setPreview(file.uid),
			 fileList: fileList
				.map(f => ({
					old: !!f.old,
					url: f.old ? f.url : window.URL.createObjectURL(f),
					name: f.name,
					uid: f.uid,
					lastModified: f.lastModified,
					lastModifiedDate: f.lastModifiedDate,
					size: f.size,
					type: f.type,
					webkitRelativePath: f.webkitRelativePath
				})),
			listType,
			buttonText
		};

		// if (this.props.defaultFileList) uploaderProps.defaultFileList = this.props.defaultFileList;

		return (
			<div>
				<UploaderComponent {...uploaderProps} />
				<UploaderFilePreview
					setPreview={this.setPreview}
					preview={preview}
					files={defaultFileListStored.concat(fileListStored)}
				/>
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
