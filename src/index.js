import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {all} from 'redux-saga/effects';
import crudReducers from './redux/reducer'
import crudSagas from './redux/saga'
import Action from './components/crud/action'
import CreateModel from './components/crud/createModel'
import CrudFull from './components/crud/crudFull'
import crudView from './components/crud/crudView'
import DataRenderer from './components/crud/dataRenderer'
import FilterDeopDown from './components/crud/filterDropdown'
import FilterRenderer from './components/crud/filterRenderer'

module.exports = require('./components/crud/');


export const reducer = {
	...crudReducers,
};
export const saga = crudSagas;
export const CrudView = crudView;

export default CrudFull