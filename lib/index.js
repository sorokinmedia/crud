'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');

var actions = {
    FETCH_CRUD_FILTER_VALUES: 'FETCH_CRUD_FILTER_VALUES',
    FETCH_CRUD_MODELS: 'FETCH_CRUD_MODELS',
    SET_CRUD_ACTIONS_FUNC: 'SET_CRUD_ACTIONS_FUNC',
    SET_CRUD_PARAMS: 'SET_CRUD_PARAMS',

    DELETE_MODEL: 'DELETE_MODEL',
    RESTORE_MODEL: 'RESTORE_MODEL',
    CREATE_MODEL: 'CREATE_MODEL',
    CHANGE_MODEL: 'CHANGE_MODEL',
    TOGGLE_CREATE_MODEL_MODAL: 'TOGGLE_CREATE_MODEL_MODAL',
    SET_MODEL_MODAL_FORM: 'SET_MODEL_MODAL_FORM',
    toggleCreateModelModal: function toggleCreateModelModal() {
        return { type: actions.TOGGLE_CREATE_MODEL_MODAL };
    },

    deleteModel: function deleteModel(id, url, modelName) {
        return { type: actions.DELETE_MODEL, payload: { id: id, url: url, modelName: modelName } };
    },
    restoreModel: function restoreModel(id, url, modelName) {
        return { type: actions.RESTORE_MODEL, payload: { id: id, url: url, modelName: modelName } };
    },
    createModel: function createModel(form, url, modelName) {
        return { type: actions.CREATE_MODEL, payload: { form: form, url: url, modelName: modelName } };
    },
    changeModel: function changeModel(form, action, modelName) {
        return { type: actions.CHANGE_MODEL, payload: { form: form, action: action, modelName: modelName } };
    },

    setModelModalForm: function setModelModalForm(modalType, initialValues, action) {
        return {
            type: actions.SET_MODEL_MODAL_FORM,
            payload: { modalType: modalType, initialValues: initialValues, action: action }
        };
    },

    setCrudActionsFunc: function setCrudActionsFunc(func, modelName) {
        return { type: actions.SET_CRUD_ACTIONS_FUNC, payload: { func: func, modelName: modelName } };
    },
    setCrudParams: function setCrudParams(params) {
        return { type: actions.SET_CRUD_PARAMS, payload: params };
    },
    fetchCrudModels: function fetchCrudModels(params, filters) {
        return { type: actions.FETCH_CRUD_MODELS, payload: { params: params, filters: filters } };
    },
    fetchCrudFilterValues: function fetchCrudFilterValues(modelName, filter, query) {
        return {
            type: actions.FETCH_CRUD_FILTER_VALUES,
            payload: { query: query, filter: filter, modelName: modelName }
        };
    }
};

var START = '_START',
    SUCCESS = '_SUCCESS',
    ERROR = '_ERROR';

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var crudModelsReducer = function crudModelsReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];
	var type = action.type,
	    response = action.response,
	    error = action.error,
	    payload = action.payload;


	switch (type) {
		case actions.FETCH_CRUD_MODELS + SUCCESS:
			return _extends({}, state, defineProperty({}, payload.params.modelName, response));
		case actions.FETCH_CRUD_MODELS + ERROR:
			return _extends({}, state, defineProperty({}, payload.params.modelName, _extends({}, state[payload.params.modelName], {
				loading: false,
				error: error
			})));
		case actions.FETCH_CRUD_MODELS + START:
			return _extends({}, state, defineProperty({}, payload.params.modelName, _extends({}, state[payload.params.modelName], {
				loading: true
			})));
		default:
			return state;
	}
};

var crudFilterValuesReducer = function crudFilterValuesReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];
	var type = action.type,
	    response = action.response,
	    error = action.error,
	    payload = action.payload;


	switch (type) {
		case actions.FETCH_CRUD_FILTER_VALUES + SUCCESS:
			return _extends({}, state, defineProperty({
				loading: false
			}, payload.modelName, _extends({}, state[payload.modelName], defineProperty({}, payload.filter, response.data))));
		case actions.FETCH_CRUD_FILTER_VALUES + ERROR:
			return _extends({}, state, { loading: false, error: error
			});
		case actions.FETCH_CRUD_FILTER_VALUES + START:
			return _extends({}, state, { loading: true });
		default:
			return state;
	}
};

var crudActionsFuncReducer = function crudActionsFuncReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];
	var type = action.type,
	    response = action.response,
	    error = action.error,
	    payload = action.payload;


	switch (type) {
		case actions.SET_CRUD_ACTIONS_FUNC:
			return _extends({}, state, defineProperty({}, payload.modelName, payload.func));
		default:
			return state;
	}
};

var isOpenModelModalReducer = function isOpenModelModalReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var action = arguments[1];
	var type = action.type,
	    response = action.response,
	    error = action.error,
	    payload = action.payload;


	switch (type) {
		case actions.TOGGLE_CREATE_MODEL_MODAL:
			return !state;
		default:
			return state;
	}
};

var modelModalFormReducer = function modelModalFormReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];
	var type = action.type,
	    response = action.response,
	    error = action.error,
	    payload = action.payload;


	switch (type) {
		case actions.SET_MODEL_MODAL_FORM:
			return payload;
		default:
			return state;
	}
};

var crudParamsReducer = function crudParamsReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];
	var type = action.type,
	    response = action.response,
	    error = action.error,
	    payload = action.payload;


	switch (type) {
		case actions.SET_CRUD_PARAMS:
			return _extends({}, state, defineProperty({}, payload.modelName, payload));
		default:
			return state;
	}
};

var crudCreateModalLoadingReducer = function crudCreateModalLoadingReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var action = arguments[1];

	switch (action.type) {
		case actions.CREATE_MODEL + START:
		case actions.CHANGE_MODEL + START:
			return true;
		case actions.CREATE_MODEL + SUCCESS:
		case actions.CHANGE_MODEL + SUCCESS:
		case actions.CREATE_MODEL + SUCCESS:
		case actions.CHANGE_MODEL + ERROR:
			return false;
		default:
			return state;
	}
};

var crudReducers = {
	crudFilterValues: crudFilterValuesReducer,
	crudModels: crudModelsReducer,
	crudActionsFunc: crudActionsFuncReducer,
	isOpenModelModal: isOpenModelModalReducer,
	modelModalForm: modelModalFormReducer,
	crudParams: crudParamsReducer,
	crudCreateModalLoading: crudCreateModalLoadingReducer
};

//import crudSagas from './redux/saga'
//import crudActions from './redux/actions'
/*import crudFull from './components/crud/crudFull'
import crudView from './components/crud/crudView'*/

var reducer = crudReducers;
var saga = crudSagas;
//export const actions = crudActions;
//export const CrudView = crudView;
//export const CrudFull = crudFull;

exports.reducer = reducer;
exports.saga = saga;
