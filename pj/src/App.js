import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      resultArray: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.searchQuery);

    axios.get('https://www.headlightlabs.com/api/assessment_search_wrapper?query='+this.state.searchQuery)
        .then( (response) => {
          console.log("In render App component", response.data);
          if(response.data.itemListElement.length === 0) {
            var array = []
            var object = {
              result: {
                description: "Could not find any results"
              }
            }
            array.push(object);
            this.setState({
              resultArray: array
            })
          } else {
            this.setState({
              resultArray: response.data.itemListElement
            })
            
          }
            
        })

  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      searchQuery: e.target.value
    })
    
  }


  render() {

    var finalArrayToShowInTable  = null;

    finalArrayToShowInTable = this.state.resultArray.map((s) => {
      return (
          <tr>
              <td>
                  {s.result.description}
              </td>
          </tr>
      );
  });

    return (
      <div className="App">
        <input type='text' value={this.state.searchQuery} onChange={this.handleChange}/>
        <input type="submit" onClick={this.handleSubmit} />
        <br/>
        <br/>

        <table className='table table-hover'>
                    <thead>
                        <tr className='table-secondary'>
                            <th id="Item Description">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {finalArrayToShowInTable}
                    </tbody>
                </table>
      </div>
    );
  }
}

export default App;
