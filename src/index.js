import React from 'react';
import 'antd/dist/antd.css';
import crudReducers from './redux/reducer'
import crudSagas from './redux/saga'
import CrudFull from './components/crud/crudFull'
import crudView from './components/crud/crudView'

export const reducer = {
	...crudReducers,
};
export const saga = crudSagas;
export const CrudView = crudView;

export default CrudFull
