import crud from './crud/reducer'
import { reducer as formReducer } from 'redux-form'

export default {
	...crud,
	form: formReducer
};
