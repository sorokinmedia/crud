import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {Icon, Input, Button, Pagination, Table} from 'antd';
import crudActions from '../../redux/actions'
import filterRenderer from './filterRenderer'
import dataRenderer from './dataRenderer'

const {fetchCrudModels} = crudActions;
const isBigDesctop = window.document.documentElement.scrollWidth > 1646;

class CrudView extends Component {

	componentDidMount() {
		const {modelName, url} = this.props;
		this.props.fetchCrudModels({modelName, url});
	}

	handleTableChange = (pagination, filters, sorter) => {
		//console.log(pagination, filters, sorter);
		this.props.fetchCrudModels({
			modelName: this.props.modelName,
			url: this.props.url,
			page: pagination.current,
			order_by: sorter.columnKey,
			order: sorter.order
		}, filters);
	};

	getFiterValues = col => {
		const {filterValues} = this.props;

		return filterValues && col.filter.can && filterValues[col.id] && filterValues[col.id] ?
			filterValues[col.id].map(elem => ({
				text: elem.name,
				value: elem.id
			}))
		: []
	};

	render() {
		const {items, modelName, tableStyle, TableWrapper, fixActionColumn} = this.props;
		if(!items || !items.data) return null;

		const listItems = items.data.items.map((elem) => ({
			...elem,
			key: elem.id,
		}));


		const columns = items.data.columns.map(col => ({
			title: col.title,//<IntlMessages id="antTable.title.id"/>,
			key: col.id,
            fixed: col.id === 'actions' && !isBigDesctop && fixActionColumn ? 'right' : null,
            width: col.id === 'actions' && !isBigDesctop && fixActionColumn ? 100 : 'auto',
			render: object => dataRenderer(object, col, modelName),
			filters: this.getFiterValues(col),
			filterIcon: col.filter.can ?
				filtered => <Icon type="filter" style={{ color: filtered ? '#108ee9' : '#aaa' }} />
				: null,
			filterDropdown: col.filter.can ? filterRenderer(col.filter.type, col.id, this.getFiterValues(col)) : null,
			sorter: col.order.can ? () => {} : null//(a, b) => Number(a.id) - Number(b.id),
		}));

		const TableComponent = TableWrapper || Table;

		return <TableComponent
            columns={columns}
            dataSource={listItems}
            className="isoSortingTable"
            onChange={this.handleTableChange}
            pagination={{
                defaultCurrent: 1,
                pageSize: 20,
                total: items.data.count,
                hideOnSinglePage: true
            }}
            loading={items.loading}
            scroll={!isBigDesctop && fixActionColumn ? { x: 1300 } : {} }
        />;
	}
}

CrudView.propTypes = {
	modelName: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
    fixActionColumn: PropTypes.bool
};

CrudView.defaultProps = {
    fixActionColumn: true
};

export default connect((state, props) => {
	return {
		items: state.crudModels[props.modelName],
		filterValues: state.crudFilterValues[props.modelName]
	}
}, {
	fetchCrudModels
})(CrudView);