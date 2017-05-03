import React from 'react';
import ReactTable from 'react-table';

const columns = [{

    header: 'Make',
    accessor: 'make',
    filterMethod: (filter, row) => {
      return row[filter.id].toLowerCase().includes(filter.value.toLowerCase());
    }
  }, {
    header: 'Model',
    id: 'model',
    accessor: 'model',
    filterMethod: (filter, row) => {
      return row[filter.id].toLowerCase().includes(filter.value.toLowerCase());
    }
  }, {
    header: 'Price',
    accessor: 'price',
    filterMethod: (filter, row) => (row[filter.id].includes(filter.value))

}]

function MyTable(props) {
	return (
		<div>
			<ReactTable
				data={props.data}
				columns={columns}
        defaultPageSize={100}
        showFilters={true}
			/>
		</div>
	)
}

export default MyTable
