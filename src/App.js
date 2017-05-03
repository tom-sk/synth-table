import React, { Component } from 'react';
import './App.css';
import Tabletop from '../public/js/tabletop1.3.4.js';
import Compare from './components/Compare.js'
import MyTable from './components/MyTable.js'
import 'bulma/css/bulma.css';
import 'react-table/react-table.css';
var Spinner = require('react-spinkit');


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
           <div>
           <Compare data={this.state.synthData}/>
           
           <MyTable
            data={this.state.synthData} />
          </div>}
      </div>
    );
  }
}

export default App;
