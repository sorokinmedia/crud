import actions from '../redux/actions'
import saga, {
	deleteModelSaga
} from '../redux/saga'
import {
	crudFilterValuesReducer,
	crudModelsReducer,
	crudActionsFuncReducer,
	isOpenModelModalReducer,
	modelModalFormReducer,
	crudParamsReducer,
	crudCreateModalLoadingReducer
} from '../redux/reducer'
import { ERROR, START, SUCCESS } from '../constants';
import { request } from 'sm-redux-saga-request';
import { put } from 'redux-saga/effects'


function testingReducer(initialState, action, reducer, error, response) {
	it('should return initialState', () => {
		expect(reducer(initialState, {})).toEqual(initialState)
	});

	it('should return loading field true', () => {
		expect(reducer(initialState, { type: action + START })).toEqual({ loading: true })
	});

	it('should return error field', () => {
		const error = 'error' || error;
		expect(reducer(initialState, { type: action + ERROR, error })).toEqual({ error });
	});

	it('should return response', () => {
		const token = 'token';
		const response = { data: { token } } || response;
		expect(reducer(initialState, { type: action + SUCCESS, response })).toEqual(response);
	});
}

describe('crudModelsReducer', () => {
	const initialState = {};
	const response = { data: 'somedata' };
	const payload = { params: { modelName: 'ModelName' } };
	const error = 'error'
	const actionSuccess = {
		type: actions.FETCH_CRUD_MODELS + SUCCESS,
		response,
		payload
	};

	const actionError = {
		type: actions.FETCH_CRUD_MODELS + ERROR,
		response,
		payload,
		error
	};

	const actionStart = {
		type: actions.FETCH_CRUD_MODELS + START,
		payload
	};

	it('should return initialState', () => {
		expect(crudModelsReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce crud models successfully', () => {
		expect(crudModelsReducer(initialState, actionSuccess)).toEqual({ [payload.params.modelName]: response })
	});

	it('should reduce crud models with error', () => {
		expect(crudModelsReducer(initialState, actionError)).toEqual({
			[payload.params.modelName]: {
				...initialState[payload.params.modelName],
				loading: false,
				error
			}
		})
	});

	it('should reduce start fetching crud models', () => {
		expect(crudModelsReducer(initialState, actionStart)).toEqual({
			[payload.params.modelName]: {
				...initialState[payload.params.modelName],
				loading: true
			}
		})
	});

});

describe('crudFilterValuesReducer', () => {
	const initialState = {};
	const response = { data: 'somedata' };
	const payload = { filter: 'filtername' };
	const error = 'error';
	const actionSuccess = {
		type: actions.FETCH_CRUD_FILTER_VALUES + SUCCESS,
		response,
		payload
	};

	const actionError = {
		type: actions.FETCH_CRUD_FILTER_VALUES + ERROR,
		response,
		payload,
		error
	};

	const actionStart = {
		type: actions.FETCH_CRUD_FILTER_VALUES + START,
		payload
	};

	it('should return filters initialState', () => {
		expect(crudFilterValuesReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce crud filters successfully', () => {
		expect(crudFilterValuesReducer(initialState, actionSuccess)).toEqual({
			loading: false,
			[payload.modelName]: {
				...initialState[payload.modelName],
				[payload.filter]: response.data,
			}
		})
	});

	it('should reduce crud filters with error', () => {
		expect(crudFilterValuesReducer(initialState, actionError)).toEqual({ loading: false, error })
	});

	it('should reduce start fetching crud models', () => {
		expect(crudFilterValuesReducer(initialState, actionStart)).toEqual({ loading: true })
	});
});

describe('crudActionsFuncReducer', () => {
	const initialState = null;
	const payload = { modelName: 'ModelName', func: () => {} };
	const action = {
		type: actions.SET_CRUD_ACTIONS_FUNC,
		payload
	};

	it('should return filters initialState', () => {
		expect(crudActionsFuncReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce actions function', () => {
		expect(crudActionsFuncReducer(initialState, action)).toEqual({ [payload.modelName]: payload.func })
	});
});

describe('isOpenModelModalReducer', () => {
	const initialState = false;
	const action = { type: actions.TOGGLE_CREATE_MODEL_MODAL, };

	it('should return model modal initialState', () => {
		expect(isOpenModelModalReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce model modal state', () => {
		expect(isOpenModelModalReducer(initialState, action)).toEqual(!initialState)
	});
});

describe('modelModalFormReducer', () => {
	const initialState = {};
	const payload = { form: 'form' };
	const action = {
		type: actions.SET_MODEL_MODAL_FORM,
		payload
	};

	it('should return model modal initialState', () => {
		expect(modelModalFormReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce model modal state', () => {
		expect(modelModalFormReducer(initialState, action)).toEqual(payload)
	});
});

describe('crudParamsReducer', () => {
	const initialState = {};
	const payload = { modelName: 'ModelName' };
	const action = {
		type: actions.SET_CRUD_PARAMS,
		payload
	};

	it('should return params initial state', () => {
		expect(crudParamsReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce params state', () => {
		expect(crudParamsReducer(initialState, action)).toEqual({ [payload.modelName]: payload })
	});
});

describe('crudCreateModalLoadingReducer', () => {
	const initialState = false;

	it('should return params initial state', () => {
		expect(crudCreateModalLoadingReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce create model start state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CREATE_MODEL + START })).toEqual(true);
	});

	it('should reduce change model start state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CHANGE_MODEL + START })).toEqual(true);
	});

	it('should reduce create model success state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CREATE_MODEL + SUCCESS })).toEqual(false);
	});
	it('should reduce change model success state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CHANGE_MODEL + SUCCESS })).toEqual(false);
	});
	it('should reduce create model error state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CREATE_MODEL + ERROR })).toEqual(false);
	});
	it('should reduce change model error state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CHANGE_MODEL + ERROR })).toEqual(false);
	});
});

describe('actions', () => {
	const
		id = 'id',
		url = 'url',
		modelName = 'Modelname',
		action = 'action',
		initialValues = {},
		modalType = 'typeModal',
		params = {},
		filters = {},
		func = () => {},
		query = 'query',
		filter = 'filter',
		form = {};

	it('toggleCreateModelModal', () => {
		expect(actions.toggleCreateModelModal()).toEqual({ type: actions.TOGGLE_CREATE_MODEL_MODAL })
	});

	it('deleteModel', () => {
		expect(actions.deleteModel(id, url, modelName)).toEqual({
			type: actions.DELETE_MODEL,
			payload: {
				id, url, modelName
			}
		})
	});

	it('restoreModel', () => {
		expect(actions.restoreModel(id, url, modelName)).toEqual({
			type: actions.RESTORE_MODEL,
			payload: {
				id, url, modelName
			}
		})
	});

	it('createModel', () => {
		expect(actions.createModel(form, url, modelName)).toEqual({
			type: actions.CREATE_MODEL,
			payload: {
				form, url, modelName
			}
		})
	});

	it('changeModel', () => {
		expect(actions.changeModel(form, action, modelName)).toEqual({
			type: actions.CHANGE_MODEL,
			payload: {
				form, action, modelName
			}
		})
	});

	it('setModelModalForm', () => {
		expect(actions.setModelModalForm(modalType, initialValues, action)).toEqual({
			type: actions.SET_MODEL_MODAL_FORM,
			payload: {
				modalType, initialValues, action
			}
		})
	});

	it('setCrudActionsFunc', () => {
		expect(actions.setCrudActionsFunc(func, modelName)).toEqual({
			type: actions.SET_CRUD_ACTIONS_FUNC, payload: { func, modelName }
		})
	});

	it('setCrudParams', () => {
		expect(actions.setCrudParams(params)).toEqual({
			type: actions.SET_CRUD_PARAMS, payload: params
		})
	});

	it('fetchCrudModels', () => {
		expect(actions.fetchCrudModels(params, filters)).toEqual({
			type: actions.FETCH_CRUD_MODELS, payload: { params, filters }
		})
	});
	it('fetchCrudFilterValues', () => {
		expect(actions.fetchCrudFilterValues(modelName, filter, query)).toEqual({
			type: actions.FETCH_CRUD_FILTER_VALUES,
			payload: {
				query, filter, modelName
			}
		})
	});
});

describe('delete model saga', () => {
	const deleteAction = {
		type: actions.DELETE_MODEL,
		payload: {url: 'url'}
	};
	it('should dispatch request action DELETE_MODEL', () => {
		expect(deleteModelSaga(deleteAction).next().value).toEqual(put(request({
			...deleteAction,
			method: 'POST',
			auth: true,
			url: `${deleteAction.payload.url}`,
			payload: deleteAction.payload
		})))
	})
});
