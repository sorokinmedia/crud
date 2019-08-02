import React, { Component } from 'react'
import { message } from 'antd'
import PropTypes from 'prop-types'

const UploadDecorator = UploderComponent => class Uploader extends Component {

	constructor(props) {
		super(props);
		this.state = { fileList: [] };
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

	render() {
		const listType = this.props.listType || 'text';
		const multiple = this.props.multiple || false;
		const { fileList } = this.state;

		const uploaderProps = {
			onRemove: (file) => {
				this.setState((state) => {
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
			fileList: fileList
				.map(f => ({
					url: window.URL.createObjectURL(f),
					name: f.name,
					uid: f.uid,
					lastModified: f.lastModified,
					lastModifiedDate: f.lastModifiedDate,
					size: f.size,
					type: f.type,
					webkitRelativePath: f.webkitRelativePath
				})),
			// action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
			listType,
		};

		return (
			<UploderComponent {...this.props} uploaderProps={uploaderProps} />
		);
	}
};

UploadDecorator.propTypes = {
	onChange: PropTypes.func.isRequired,
	listType: PropTypes.string,
	multiple: PropTypes.bool,
};

export default UploadDecorator
