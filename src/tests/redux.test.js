import configureStore from 'redux-mock-store'
import actions from '../redux/actions'
import saga from '../redux/saga'
import {
	crudFilterValues,
	crudModels,
	crudActionsFunc,
	isOpenModelModal,
	modelModalForm,
	crudParams,
	crudCreateModalLoading
} from '../redux/reducer'
import { reducer as formReducer } from 'redux-form'
import { put } from 'redux-saga/effects';
import { ERROR, START, SUCCESS } from '../constants';

const mockStore = configureStore([]);

function testRequestStart(actions) {
	actions.forEach(action => it(`should start ${action.type} request`, () => {
		store.dispatch(action);
		store.getActions(action.type)
	}))
}

function testingReducer(initialState, action, reducer, error, response) {
	it('should return initialState', () => {
		expect(reducer(initialState, {})).toEqual(initialState)
	});

	it('should return loading field true', () => {
		expect(reducer(initialState, {type: action + START} )).toEqual({loading: true})
	});

	it('should return error field', () => {
		const error = 'error' || error;
		expect(reducer(initialState, {type: action + ERROR, error: error} )).toEqual({error});
	});

	it('should return response', () => {
		const token = 'token';
		const response =  {data: {token: token} } || response;
		expect(reducer(initialState, {type: action + SUCCESS, response } )).toEqual(response);
	});
};
