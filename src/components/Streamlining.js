import React from 'react'
import Table from './Table'

class Streamlining extends React.Component {
  /**
   * 
   * @param {getData} props must return the data with the maximum to retrieve
   */
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data || [],
      maxNumberOfEntries: 18000
    }
  }

  componentWillMount() {
    this.fetchData()
    //first off load the initial data, about 10 or whatever....
    // attach the window object that will read the size of the component and the size
    // of the affected area to get more data
  }

  fetchData() {
    this.setState({data})

  }

  render() {
    return (
      <div>
        <Table data={this.state.data} headers={this.props.headers} id="id" />
      </div>
    )
  }
}

export default Pagination
