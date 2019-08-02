import { all, call, put, takeEvery, select } from 'redux-saga/effects'
import { FAIL, START, SUCCESS } from '../constants'
import regeneratorRuntime from 'regenerator-runtime'

export function getCookie(name) {
	const matches = document.cookie.match(new RegExp(
		'(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
	))

	return matches ? decodeURIComponent(matches[1]) : undefined
}

export const getError = (data, response) => {
	if (data.status === 0) return {
		message: 'Unknow error: check your authorization. '
			+ 'No \'Access-Control-Allow-Origin\' header is present on the requested resource.'
	};
	if (data.status === 500) return response;
	if (response.messages) return response.messages[0];

	return ''
};


export function* requestSaga(action) {
	const {
		payload, method, url, auth, oldType: type, token_is_active
	} = action;

	const SITE = yield select(state => state.X);

	const token = getCookie('auth_token')

	try {
		yield put({
			...action,
			type: type + START
		});

		const body = payload ? JSON.stringify(payload) : '';
		const headers = new Headers({'Content-Type': 'application/json'});
		if (auth) headers.set('Authorization', 'Bearer ' + token);

		const params = {
			method,
			headers,
			mode: 'cors'
		};

		if (body && method !== 'GET') params.body = body;

		const data = yield call(
			fetch,
			SITE + url,
			params
		);

		const response = yield data.json();
		if (data.status !== 200) {
			const error = getError(data, response);

			yield put({
				...action,
				type: type + FAIL,
				error
			})
		} else {
			yield put({
				...action,
				type: type + SUCCESS,
				response: {
					data: response.response,
					error: response.status === 100 || response.messages[0].type === 2
						? response.messages[0].message
						: null,
					status: response.status,
					message: response.status === 0 || response.messages[0].type === 0
						? response.messages[0].message
						: null
				}
			});
		}
	} catch (err) {
		console.log(err)
	}
}

export function* requests() {
	yield all([
		takeEvery('REQUEST', requestSaga),
	]);
}
