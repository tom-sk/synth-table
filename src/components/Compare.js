import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import SynthInfoCard from '../components/SynthInfoCard.js';

const theme = {
  container: {
    position: 'relative',
  },
  input: {
    width: 240,
    height: 30,
    padding: '10px 20px',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    border: '1px solid #aaa',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 30,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// suggestion.make + " " +
function getSuggestionValue(suggestion) {
  return  suggestion.model;
}

function renderSuggestion(suggestion) {
  return (
    <div>
    <span>{suggestion.make + " "}{suggestion.model}</span>
    <span></span>
    </div>
  );
}



export default class Compare extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      currentSynth: [{"model":"1"}],
      testState: false
    };
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getCurrentSynth = this.getCurrentSynth.bind(this);
    this.test = this.test.bind(this);
  }

  getSuggestions(value, arr) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {return [];}
    const regex = new RegExp('^' + escapedValue, 'i');
    return arr.filter(synth => regex.test(synth.make));
  }
  getCurrentSynth(value, arr){
    var prop = 'model';

    return arr.filter(function(obj){

      return obj[prop] == value;
    });
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
      currentSynth: this.getCurrentSynth(newValue, this.props.data)
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value, this.props.data),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  componentWillMount(){
    this.setState({
      currentSynth:this.props.data
    });
  }
  test(){
    this.setState({
      testState: true
    })
  }
  render() {
    const { value, suggestions, currentSynth, testState } = this.state;
    const inputProps = {
      placeholder: "Search Synth...",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <div className="test">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={theme}
            />
        </div>
        <SynthInfoCard  data={currentSynth} test={testState}/>

      </div>
    );
  }
}
