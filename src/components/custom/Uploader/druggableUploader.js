import React, { Component } from 'react'
import { message, Upload, Icon } from 'antd'
import PropTypes from 'prop-types'
import UploadDecorator from './uploadDdecorator';

function Uploader(props) {
	return (
		<div>
			<Upload.Dragger {...props.uploaderProps}>
				<p className="ant-upload-drag-icon">
					<Icon type="inbox" />
				</p>
				<p className="ant-upload-text">Кликните или перетащите изображение</p>
				<p className="ant-upload-hint">
					Размер изображение не больше 10MB
				</p>
			</Upload.Dragger>
		</div>
	)
}

Uploader.propTypes = {
	uploaderProps: PropTypes.object.isRequired,
	listType: PropTypes.string
};

export default UploadDecorator(Uploader)
