import React, { Component } from 'react';
import './App.css';
import Tabletop from '../public/js/tabletop1.3.4.js';
import Item from './components/item.js';
import 'bulma/css/bulma.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
var Spinner = require('react-spinkit');


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

const MyTable = (props) => {
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





class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      synthData: [],
      filterText: '',
      isLoaded: false

    };
    this.myData = this.myData.bind(this);
  }
  myData (data) {
      this.setState({
              synthData: data,
              isLoaded: true
            });

    }
  componentWillMount(){
    var URL = '1O5QWEC1GBf7SjC8UCseUKPc3QDjGyxVtBZ2jSS3PMAk';
        Tabletop.init( { key: URL, callback: this.myData, simpleSheet: true });
        // this.setState({isloaded:true});

  }
  render() {
    return (
      <div className="App container">
          <h1>Synth List</h1>
             {!this.state.isLoaded ?
               <Spinner spinnerName='wave' /> :
               <MyTable
                data={this.state.synthData} />}

      </div>
    );
  }
}

export default App;
