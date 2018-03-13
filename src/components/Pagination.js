import React from 'react'
import Table from './Table'
import PaginationButtonArea from './PaginationButtonArea'
import pagination from '../common/pagination'

class Pagination extends React.Component {
  /**
   * 
   * @param {getData} props must return the data with the maximum to retrieve
   * @param {headers} props this is the series of headers that get inserted into the componet
   */
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      data: this.props.data || [],
      max: 1,
      numberOfPagesShown: 10,
      entriesOnPage: 10,
      maxNumberOfEntries: 1800
    }
    this.state.max = Math.floor(this.state.maxNumberOfEntries - this.state.entriesOnPage)
    this.pagination = new pagination(props.getData, this.state.entriesOnPage, this.state.maxNumberOfEntries)
    this.changeCurrentPage = this.changeCurrentPage.bind(this)
    this.setHeaders(props.headers)
  }

  setHeaders(headers) {
    for(let h of headers) {
      if (h.component) {
        h.component = h.component(this)
      }
    }
  }

  componentWillMount() {
    this.changeCurrentPage(1)
  }

  setMax(data) {
    let max = data ? Math.floor(data.length / this.state.entriesOnPage) : 1
    this.setState({max: max})
  }

  changeCurrentPage(num) {
    let currentPage = this.state.currentPage
    if (num <= 1) {
      currentPage = 1
    }
    else if (num > this.state.max) {
      currentPage += this.state.max
    } else {
      currentPage = num
    }
    this.pagination.getData(currentPage).then(data => {
      this.setState({data, currentPage})
    })
  }

  remove(id) {
    this.pagination.remove(id)
    this.changeCurrentPage(this.state.currentPage)
  }

  render() {
    return (
      <div>
        <Table
          data={this.state.data}
          headers={this.props.headers}
          id="id" 
        />
        <PaginationButtonArea
          {...this.state}
          changeCurrentPage={this.changeCurrentPage}
        />
      </div>
    )
  }
}

export default Pagination
