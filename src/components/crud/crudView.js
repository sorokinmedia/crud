import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Icon, Table } from 'antd';
import crudActions from '../../redux/actions'
import filterRenderer from './filterRenderer'
import dataRenderer from './dataRenderer'
import Loader from './loader'

const { fetchCrudModels, fetchCrudChildren, setCrudParams } = crudActions;
const isBigDesctop = window.document.documentElement.scrollWidth > 1646;

class CrudView extends Component {

	static propTypes = {
		modelName: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		fixActionColumn: PropTypes.bool,
		iconTheme: PropTypes.string,
		getChildrenUrl: PropTypes.func,
		size: PropTypes.string,
		tdClass: PropTypes.string,
		scrollX: PropTypes.number,
		pageSize: PropTypes.number,
		fetchCrudModels: PropTypes.func.isRequired,
		fetchCrudChildren: PropTypes.func.isRequired,
		setCrudParams: PropTypes.func.isRequired,
		crudParams: PropTypes.object.isRequired,
		filterValues: PropTypes.array,
	};

	static defaultProps = {
		fixActionColumn: true,
		scrollX: 1300,
		pageSize: 20
	};

	componentDidMount() {
		const { modelName, url } = this.props;
		this.props.fetchCrudModels({
			modelName,
			url
		});
	}

	getFiterValues = (col) => {
		const { filterValues } = this.props;

		return filterValues && col.filter.can && filterValues[col.id] && filterValues[col.id] ?
			filterValues[col.id].map(elem => ({
				text: elem.name,
				value: elem.id
			}))
			: []
	};

	handleExpand = (isExpanded, row) => {

		if (isExpanded) {
			this.props.fetchCrudChildren(row.id, this.props.modelName, this.props.getChildrenUrl(row.id))
		}
	};

	handleTableChange = (pagination, filters, sorter) => {
		this.props.fetchCrudModels({
			modelName: this.props.modelName,
			url: this.props.url,
			page: pagination.current,
			order_by: sorter.columnKey,
			order: sorter.order
		}, filters);

		this.props.setCrudParams({
			...this.props.crudParams[this.props.modelName],
			page: pagination.current,
			order_by: sorter.columnKey,
			order: sorter.order,
			filters
		})
	};

	render() {
		const {
			items,
			modelName,
			tableStyle,
			TableWrapper,
			fixActionColumn,
			iconTheme,
			size,
			tdClass,
			scrollX,
			pageSize
		} = this.props;

		if (items && !items.data && items.loading) return <Loader />;
		if (!items || !items.data) return null;

		const listItems = items.data.items.map(elem => ({
			...elem,
			key: elem.id,
			children: elem.has_child ? elem.children || [] : null
		}));
		// console.log(fixActionColumn, isBigDesctop)

		const columns = items.data.columns.map(col => ({
			className: 'crud-table-column' + (tdClass ? ' ' + tdClass : ''),
			title: col.title, // <IntlMessages id="antTable.title.id"/>,
			key: col.id,
			fixed: col.id === 'actions' && !isBigDesctop && fixActionColumn ? 'right' : null,
			width: col.id === 'actions' && !isBigDesctop && fixActionColumn ? 150 : 'auto',
			render: object => dataRenderer(object, col, modelName, iconTheme),
			filters: this.getFiterValues(col),
			filterIcon: col.filter.can
				? filtered => (
					<Icon
						type="filter"
						style={{ color: filtered ? '#108ee9' : '#aaa' }}
						theme="outlined"
					/>)
				: null,
			filterDropdown: col.filter.can
				? filterRenderer(col.filter.type, col.id, this.getFiterValues(col))
				: null,
			sorter: col.order.can ? () => {
			} : null// (a, b) => Number(a.id) - Number(b.id),
		}));

		const TableComponent = TableWrapper || Table;

		return (
			<TableComponent
				columns={columns}
				dataSource={listItems}
				className="isoSortingTable"
				onChange={this.handleTableChange}
				pagination={{
					defaultCurrent: 1,
					pageSize,
					total: items.data.count,
					hideOnSinglePage: true
				}}
				loading={items.loading}
				scroll={!isBigDesctop && fixActionColumn ? { x: scrollX } : {}}
				onExpand={this.handleExpand}
				size={size}
				tableStyle={tableStyle}
				rowClassName={record => record.row ? record.row.state : 'dark'}
			/>
		);
	}
}

export default connect((state, props) => ({
	items: state.crudModels[props.modelName],
	filterValues: state.crudFilterValues[props.modelName],
	crudParams: state.crudParams
}), {
	fetchCrudModels,
	fetchCrudChildren,
	setCrudParams
})(CrudView);
