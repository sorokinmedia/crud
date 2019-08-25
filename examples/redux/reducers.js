import { reducer } from '../../src/index'
import { reducer as formReducer } from 'redux-form'
import actions from './actions'
import { SUCCESS, ERROR} from "./constants";

export function fetchFileConfigReducer(state = {}, action) {
	const { type, response, error } = action;

	switch(type) {
	case actions.FETCH_FILE_CONFIG + SUCCESS:
		return response;
	case actions.FETCH_FILE_CONFIG + ERROR:
		return { error };
	default:
		return state;
	}
}

export default {
	...reducer,
	form: formReducer,
	fileConfig: fetchFileConfigReducer
}
