import {reducer} from '../../src/index'
import { reducer as formReducer } from 'redux-form'

export default {
	...reducer,
	form: formReducer
}
