import React  from 'react'
import { Upload, Icon, Button } from 'antd'
import PropTypes from 'prop-types'
import UploadDecorator from './uploadDdecorator';

function Uploader(props) {
	return (
		<Upload {...props.uploaderProps}>
			<Button type={'default'}>
				<Icon type="upload" /> {props.buttonText}
			</Button>
		</Upload>
	)
}

Uploader.propTypes = {
	uploaderProps: PropTypes.object.isRequired,
	buttonText: PropTypes.string,
	listType: PropTypes.string,
};

Uploader.defaultProps = {
	buttonText: 'Upload',
};

export default UploadDecorator(Uploader)
