import React from 'react';
//import 'antd/dist/antd.css';
import crudReducers from './redux/reducer'
import crudSagas from './redux/saga'
import crudActions from './redux/actions'
import crudFull from './components/crud/crudFull'
import crudView from './components/crud/crudView'

export const reducer = crudReducers;
export const saga = crudSagas;
export const actions = crudActions;
export const CrudView = crudView;
export const CrudFull = crudFull;
