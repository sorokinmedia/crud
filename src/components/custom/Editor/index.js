import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.css'
import { get } from 'lodash'
class DraftEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: props.input && props.input.value
				? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(props.input.value)))
				: EditorState.createEmpty(),
		}
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
		this.props.input.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
	};

	render() {
		const { editorState } = this.state;
		console.log(this.props)
		console.log(this.state)
		return (
			<Editor
				defaultContentState="defaultContentState"
				initialEditorState="initialEditorState"
				defaultEditorState="defaultEditorState"
				placeholder="Текст"
				editorState={editorState}
				wrapperClassName="demo-wrapper"
				onEditorStateChange={this.onEditorStateChange}
				editorClassName="ant-input form-control"
				toolbar={{
					options: ['inline', 'list', 'link', 'history'],
					inline: {
						options: ['bold', 'italic'],
					},
					list: {
						options: ['unordered', 'ordered'],
					},

				}}
				localization={{
					locale: 'ru',
				}}
			/>
		)
	}
}

DraftEditor.propTypes = {
	input: PropTypes.object,
	initialValue: PropTypes.object,
}
export default DraftEditor
