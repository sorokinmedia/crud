import Draft from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import ReactDraft from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.css'

class DraftEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: props.input && props.input.value
				? Draft.EditorState.createWithContent(Draft.ContentState.createFromBlockArray(Draft.convertFromHTML(props.input.value)))
				: Draft.EditorState.createEmpty(),
		}
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
		this.props.input.onChange(draftToHtml(Draft.convertToRaw(editorState.getCurrentContent())))
	};

	render() {
		const { editorState } = this.state;

		return (
			<ReactDraft.Editor
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
