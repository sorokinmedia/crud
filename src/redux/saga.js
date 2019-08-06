import moment from 'moment'
import { stopSubmit } from 'redux-form';
import { all, fork, put, select, takeEvery, call } from 'redux-saga/effects';
import requestMiddleware, { request } from 'sm-redux-saga-request'
import { buildUrlSearch, buildUrlSearchForArray } from 'sm-string-helper'
import { ERROR, SORT_ASC, SORT_DESC, SUCCESS, SUCCESS_REQ } from '../constants';
import notification from '../notification';
import actions from './actions';
import regeneratorRuntime from 'regenerator-runtime'
import reduceMessages from "../helpers/reduceMessages";
import {getCookie} from "./requestSaga";
export const selectCrudParams = state => state.crudParams;

function isDateColumn(columns, key) {
	return !!columns.find(e => e.type === 'date' && e.id === key);
}

function getFiltersValues(filters, columns) {

	const res = Object.keys(filters).reduce((acc, key) => ({
		...acc,
		[key]: isDateColumn(columns, key) ? (filters[key] instanceof Array || null) ? null : moment(filters[key]).unix()
			: filters[key].constructor !== Array ? filters[key]
				: null
	}), {});
	// buildUrlSearchForArray(filters[key], key)

	return res;
}

export const selectColumns = modelName => state => state.crudModels[modelName];

export function* fetchCrudModelsSaga(action) {
	const { payload } = action;
	const {
		order, order_by, page, modelName, url: passedUrl
	} = payload.params || {};
	const crudParams = yield select(selectCrudParams);

	const url = passedUrl || crudParams[modelName].crudRead;

	const model = yield select(selectColumns(modelName));

	const columns = model && model.data ? model.data.columns : [];
	const filters = yield getFiltersValues(payload.filters || {}, columns);

	const params = payload ? buildUrlSearch({
		...filters,
		order: !order ? null : order === 'ascend' ? SORT_ASC : SORT_DESC,
		order_by,
		page

	}) : '';

	const paramsArr = [params];

	if (payload.filters) Object.keys(payload.filters).forEach((key) => {
		if (payload.filters[key] && payload.filters[key].constructor === Array) {
			paramsArr.push(buildUrlSearchForArray(payload.filters[key], key))
		}
	});

	const paramsStr = paramsArr.reduce((acc, e, i) => {
		const start = i && !acc && e ? '?' : '';
		const delimiter = (acc && e ? '&' : '');

		return acc + start + delimiter + e
	}, '');

	yield put(request({
		...action,
		method: 'GET',
		auth: true,
		url: `${url}${paramsStr}`
	}))
}

export function* fetchCrudModelsSuccessSaga(action) {
	const { response, payload } = action;
	if (!response.data) return;

	const { columns } = response.data;
	for (let i = 0; i < columns.length; i++) {
		const column = columns[i];
		if (column.filter.can && column.filter.query) {
			yield put(actions.fetchCrudFilterValues(payload.params.modelName, column.id, column.filter.query))
		}
	}
}

export function* fetchCrudFilterValuesSaga(action) {
	yield put(request({
		...action,
		method: 'GET',
		auth: true,
		url: `${action.payload.query}`
	}))
}

/*
	 Actions Handling
 */
function* filesUpload(modelName, filesStore) {
	const params = yield select(selectCrudParams);
	const { uploadFilesSettings } = params[modelName];

	if (!uploadFilesSettings) return null;

	const modelFiles = filesStore && filesStore[modelName] ? filesStore[modelName].fileList : null;
	const result = [];
	let i = 0;

	while (i < modelFiles.length) {
		const formData = new FormData();

		formData.append('file', modelFiles[i]);

		const filesResp = yield call(fetch, uploadFilesSettings.url, {
			method: 'POST',
			headers: { Authorization: 'Bearer ' + uploadFilesSettings.token },
			mode: 'cors',
			body: formData
		});

		const res = yield filesResp.json();
		result.push(res.response);

		i++;
	}

	return result;
}

export function* getHandledFiles(modelName) {
	const filesStore = yield select(state => state.uploaderFiles);
	const filesStoreModel = filesStore[modelName] || {};
	const files = yield filesUpload(modelName, filesStore);
	const defaultList = filesStoreModel.defaultFileList;

	return files.concat(defaultList || []);
}

export function* createModelSaga(action) {
	const params = yield select(selectCrudParams);
	const { modelName } = action.payload;
	const { submitShape } = params[modelName];

	const uploadedFiles = yield getHandledFiles(modelName);

	const form = submitShape(action.payload.form, uploadedFiles);

	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: `${action.payload.url}`,
		payload: { ...form },
		modelName
	}))
}

export function* updateModelsSaga(action) {
	const params = yield select(selectCrudParams);
	const {
		modelName, crudRead, filters, page, order, order_by
	} = params[action.modelName || action.payload.modelName];

	yield put(actions.fetchCrudModels({
		modelName,
		url: crudRead,
		page,
		order_by,
		order
	}, filters));
}

export function* deleteModelSaga(action) {
	yield put(request({
		...action,
		method: action.payload.action.method, //'POST',
		auth: true,
		url: `${action.payload.action.url}`,
		payload: action.payload,
		modelName: action.payload.modelName
	}))
}

export function* restoreModelSaga(action) {
	yield put(request({
		...action,
		method: 'POST',
		auth: true,
		url: `${action.payload.url}`,
		payload: action.payload
	}))
}

export function* changeModelSaga(action) {
	const params = yield select(selectCrudParams);
	const uploadedFiles = yield getHandledFiles(action.payload.modelName);

	yield put(request({
		...action,
		method: action.payload.action.method, //'POST',
		auth: true,
		url: `${action.payload.action.url}`,
		payload: params[action.payload.modelName].submitShape(action.payload.form, uploadedFiles),
		modelName: action.payload.modelName
	}));
}

export function* fetchCrudChildrenSaga(action) {
	yield put(request({
		...action,
		method: 'GET',
		auth: true,
		url: `${action.payload.url}`,
		payload: action.payload
	}))
}

export function* closeModalSaga() {
	yield put(actions.toggleCreateModelModal());
	yield put(actions.setModelModalForm(null, null));
}

export function* submitModelsModalFormFailSaga(action) {
	const errors = reduceMessages(action.messages);
	yield put(stopSubmit('createModel', errors));
	yield notification('error', action.error.message);
}

export function* notifySaga(action) {
	if (action.error) yield notification('error', action.error.message)
	if (action.response.status === SUCCESS_REQ) yield notification('success', action.response.message)
}

export default function* rootSaga() {
	yield all([
		takeEvery(actions.FETCH_CRUD_MODELS, fetchCrudModelsSaga),
		takeEvery(actions.FETCH_CRUD_MODELS + SUCCESS, fetchCrudModelsSuccessSaga),
		takeEvery(actions.FETCH_CRUD_FILTER_VALUES, fetchCrudFilterValuesSaga),

		takeEvery(actions.FETCH_CRUD_CHILDREN, fetchCrudChildrenSaga),

		takeEvery(actions.CREATE_MODEL, createModelSaga),
		takeEvery(actions.CREATE_MODEL + SUCCESS, closeModalSaga),
		takeEvery(actions.CREATE_MODEL + SUCCESS, updateModelsSaga),
		takeEvery(actions.CREATE_MODEL + SUCCESS, notifySaga),
		takeEvery(actions.CREATE_MODEL + ERROR, submitModelsModalFormFailSaga),

		takeEvery(actions.DELETE_MODEL, deleteModelSaga),
		takeEvery(actions.DELETE_MODEL + SUCCESS, updateModelsSaga),
		takeEvery(actions.DELETE_MODEL + SUCCESS, notifySaga),
		takeEvery(actions.DELETE_MODEL + ERROR, notifySaga),

		takeEvery(actions.RESTORE_MODEL, restoreModelSaga),
		takeEvery(actions.RESTORE_MODEL + SUCCESS, updateModelsSaga),
		takeEvery(actions.RESTORE_MODEL + SUCCESS, notifySaga),
		takeEvery(actions.RESTORE_MODEL + ERROR, notifySaga),

		takeEvery(actions.CHANGE_MODEL, changeModelSaga),
		takeEvery(actions.CHANGE_MODEL + SUCCESS, closeModalSaga),
		takeEvery(actions.CHANGE_MODEL + SUCCESS, updateModelsSaga),
		takeEvery(actions.CHANGE_MODEL + SUCCESS, notifySaga),
		takeEvery(actions.CHANGE_MODEL + ERROR, submitModelsModalFormFailSaga),

		fork(requestMiddleware)

	]);
}
