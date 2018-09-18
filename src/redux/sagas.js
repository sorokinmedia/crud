import {all} from 'redux-saga/effects';
import crud from './crud/saga'

export default function* rootSaga() {
	yield all([
		crud()
	]);
}