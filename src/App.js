import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/Table'
import {generateRandomObjs, NUM, formatDollars, WORDNUM} from './common/utils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      objs: []
    }
  }

  headers() {
    let that = this
    let headers = [{
      name: "First Name",
      field: "firstName",
      maxSize: 12
    }, {
      name: "Last Name",
      field: "lastName",
      maxSize: 12
    }, {
      name: "Phone",
      field: "phone",
      type: WORDNUM,
      maxSize: 10,
      minSize: 10,
      format: phone => {
        let s = String(phone)
        return s.substring(0, 3) + "-" + s.substr(3, 4) + "-" + s.substr(6)
      }
    }, {
      name: "Address",
      field: "address",
      maxSize: 40,
      minSize: 12
    }, {
      name: "State",
      field: "state",
      maxSize: 20,
      minSize: 5
    }, {
      name: "Age",
      field: "age",
      maxSize: 2,
      minSize: 1,
      type: NUM
    }, {
      name: "Salary",
      field: "salary",
      maxSize: 9,
      minSize: 4,
      type: NUM,
      format: formatDollars
    }, {
      name: "Delete",
      key: "id",
      component: function (props) {
        let deleteTheObject = () => {
          let index = that.state.objs.findIndex((obj) => {
            return obj.id === props.data.id
          })
          that.state.objs.splice(index, 1)
          that.setState(that.state)
        }
        return <button onClick={() => deleteTheObject()}>DELETE</button>
      }
    }]
    return headers
  }

  componentWillMount() {
    setTimeout(() => {
      let objs = generateRandomObjs(this.headers(), 1800)
      this.setState({objs: objs})
    }, 100)
  }

  clickButton() {
    console.log("clicked button")
  }

  clickDiv() {
    console.log("DIIVVVSD")
  }


  render() {

    /**
     * 1. lets create some random data for the table
     * 2. have some more fields
     */


    

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <Table data={this.state.objs} headers={this.headers()} id="id" />
        </div>
      </div>
    );
  }
}

export default App;
