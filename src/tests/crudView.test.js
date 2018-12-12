import {configure, mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build/index'
import 'babel-polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import jsdom from 'jsdom'
import CrudView from '../components/crud/crudView'
import thunk from 'redux-thunk';
import { shallowToJson } from 'enzyme-to-json';

const { JSDOM } = jsdom;
const doc = new JSDOM('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
global.navigator = {
	userAgent: 'node.js',
};

//const {SignUpClass} = require('../../../containers/Page/signup');

configure({adapter: new Adapter()});

const mockStore = configureStore([thunk]);

describe('it should render CrudFull', () => {
	let container, modelName = 'model';

	beforeAll(() => {
		container = shallow(<CrudView handleSubmit={jest.fn} store={mockStore({ crudModels: { modelName }, crudFilterValues: {} })} modelName={modelName} />);
	});

	it('it should render SignUp connected container', () => {
		expect(shallowToJson(container)).toMatchSnapshot();
	});
});
