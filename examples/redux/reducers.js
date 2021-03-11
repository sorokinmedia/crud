import { reducer } from '../../src/index';
import { reducer as formReducer } from 'redux-form';

function userReducer(state = { data: { timezone: { name: 'Pacific/Kiritimati' } } }) {
	return state;
}

export default {
	...reducer,
	form: formReducer,
	user: userReducer
}
