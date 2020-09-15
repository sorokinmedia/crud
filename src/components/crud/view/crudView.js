import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Table } from 'antd';

import crudActions from '../../../redux/actions';
import filterRenderer from '../filter/filterRenderer';
import dataRenderer from '../dataRenderer';
import Loader from '../loader';
import ColumnSelect from '../columnSelect';

const { fetchCrudModels, fetchCrudChildren, setCrudParams } = crudActions;
const viewWidth = Math.min(window.innerWidth, screen.width);
const isNotMiddleSizeWindow = viewWidth < 800;

class CrudView extends Component {
	componentDidMount() {
		const { modelName, url } = this.props;
		this.props.fetchCrudModels({
			modelName,
			url
		});
	}

	getFilterValues = (col) => {
		const { filterValues } = this.props;

		return filterValues && col.filter.can && filterValues[col.id] ?
			filterValues[col.id].map(elem => ({
				text: elem.name,
				value: elem.id
			}))
			: []
	};

	getTablePropValue = (propColumn, key) => {
		const { id, [key]: value } = propColumn;
		if (value) return value;

		const { tableProps } = this.props;

		if (!tableProps) return null;
		if (!tableProps.fixedColumns) return null;

		const column = tableProps.fixedColumns.find(e => e.id === id);

		if (column) return column[key];

		return null;
	};

	mapItems = items => items.map(elem => ({
		...elem,
		key: elem.id,
		children: elem.has_child ? this.mapItems(this.props.children[elem.id] || []) : null
	}));

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
			pageSize,
			rowSelection,
			bordered,
			tableProps,
			filteredColumns
		} = this.props;

		if (items && !items.data && items.loading) return <Loader />;
		if (!items || !items.data) return null;

		const listItems = this.mapItems(items.data.items);
		// console.log(fixActionColumn, isNotMiddleSizeWindow)

		const columnsDirty = filteredColumns[modelName];

		const columns = (columnsDirty || []).filter(e => e.visible).map(col => ({
			id: col.id,
			className: 'crud-table-column' + (tdClass ? ' ' + tdClass : ''),
			title: <span dangerouslySetInnerHTML={{ __html: col.title }} />, // <IntlMessages id="antTable.title.id"/>,
			key: col.id,
			fixed: col.id === 'actions' && !isNotMiddleSizeWindow && fixActionColumn
				? 'right' : this.getTablePropValue(col, 'fixed'),
			width: col.id === 'actions' && !isNotMiddleSizeWindow && fixActionColumn
				? 150 : this.getTablePropValue(col, 'width') || 'auto',
			render: object => dataRenderer(object, col, modelName, iconTheme),
			filters: this.getFilterValues(col),
			filterIcon: col.filter.can
				? filtered => (
					<Icon
						type="filter"
						style={{ color: filtered ? '#108ee9' : '#aaa' }}
						theme="outlined"
					/>
				)
				: null,
			filterDropdown: col.filter.can
				? filterRenderer(col.filter.type, col.id, this.getFilterValues(col))
				: null,
			sorter: col.order.can ? () => {
			} : null // (a, b) => Number(a.id) - Number(b.id),
		}));

		const TableComponent = TableWrapper || Table;
		const scrollXPTable = !isNotMiddleSizeWindow && fixActionColumn ? { x: scrollX } : {};

		return (
			<div style={{ position: 'relative' }}>
				<ColumnSelect modelName={modelName} />
				<TableComponent
					{...tableProps}
					columns={columns}
					dataSource={listItems}
					className="isoSortingTable"
					onChange={this.handleTableChange}
					pagination={{
						defaultCurrent: 1,
						pageSize: items.data.filter.limit || pageSize,
						total: items.data.count,
						hideOnSinglePage: true
					}}
					loading={items.loading}
					scroll={{
						...tableProps.scroll,
						...scrollXPTable
					}}
					onExpand={this.handleExpand}
					size={size}
					tableStyle={tableStyle}
					rowClassName={record => (record.row ? record.row.state : 'default')}
					rowSelection={rowSelection}
					bordered={bordered}
				/>
			</div>
		);
	}
}

CrudView.propTypes = {
	modelName: PropTypes.string.isRequired,
	children: PropTypes.shape({}).isRequired,
	url: PropTypes.string.isRequired,
	fetchCrudModels: PropTypes.func.isRequired,
	fetchCrudChildren: PropTypes.func.isRequired,
	setCrudParams: PropTypes.func.isRequired,
	crudParams: PropTypes.object.isRequired,
	filteredColumns: PropTypes.object.isRequired,
	items: PropTypes.object.isRequired,
	tableStyle: PropTypes.object,
	fixActionColumn: PropTypes.bool,
	bordered: PropTypes.bool,
	filterValues: PropTypes.object,
	iconTheme: PropTypes.string,
	getChildrenUrl: PropTypes.func,
	size: PropTypes.string,
	tdClass: PropTypes.string,
	scrollX: PropTypes.number,
	pageSize: PropTypes.number,
	rowSelection: PropTypes.func,
	tableProps: PropTypes.object,
	TableWrapper: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.func
	]),
};

CrudView.defaultProps = {
	fixActionColumn: true,
	filterValues: null,
	scrollX: 1300,
	pageSize: 20,
	tableProps: {},
	tableStyle: {},
	TableWrapper: null,
	bordered: false
};

export default connect((state, props) => ({
	items: state.crudModels[props.modelName],
	filterValues: state.crudFilterValues[props.modelName],
	crudParams: state.crudParams,
	filteredColumns: state.crudColumns,
	children: state.children,
}), {
	fetchCrudModels,
	fetchCrudChildren,
	setCrudParams
})(CrudView);
