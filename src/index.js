import React from 'react';
import crudFull from './components/crud/crudFull'
import crudView from './components/crud/crudView'
import crudActions from './redux/actions'
import crudReducers from './redux/reducer'
import crudSagas from './redux/saga'
import './style.css'

export const reducer = crudReducers;
export const saga = crudSagas;
export const actions = crudActions;
export const CrudView = crudView;
export const CrudFull = crudFull;
