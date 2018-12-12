import {configure, mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build/index'
import 'babel-polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import jsdom from 'jsdom'
import CrudFull from '../components/crud/crudFull'
import thunk from 'redux-thunk';
import { shallowToJson } from 'enzyme-to-json';
import {BrowserRouter} from 'react-router-dom';
import CreateModalForm from '../components/crud/createModel';
import CrudView from '../components/crud/crudView';

const {JSDOM} = jsdom;
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
	let container;

	beforeAll(() => {
		container = shallow(<CrudFull store={mockStore({})} />);
	});

	it('it should render CrudFull connected container', () => {
		expect(shallowToJson(container)).toMatchSnapshot();
	});
});

describe('should mount CrudFull', () => {
	let container;
	const modelName = 'model';
	const onCreate = jest.fn();

	beforeAll(() => {
		const store = mockStore({
			form: {},
			crudModels: {
				[modelName]: []
			},
			crudFilterValues: {
				[modelName]: {}
			},
			isModalOpen: true
		});
		container = mount(<Provider store={store}>
			<BrowserRouter>
				<CrudFull
					crudRead={'url'}
					modelName={'model'}
					createDisabled={false}
				/>
			</BrowserRouter>
		</Provider>);
	});

	it('it should contains creatButton', () => {
		const button = container.find('button').filterWhere(btn => btn.props().name === 'createButton');
		expect(button.length).toBe(1);
	});

	it('it should contains crudView', () => {
		expect(container.find(CrudView).length).toBe(1);
	});

	it('it should contains crud modal', () => {
		const button = container.find('button').filterWhere(btn => btn.props().name === 'createButton').first();
		button.simulate('click');
		const full = container.find(CrudFull).first();
		full.update();
		expect(container.find(CreateModalForm).length).toBe(1);
	});
});
