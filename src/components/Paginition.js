import React from 'react'
import Table from './Table'
import PaginationButtons from './PaginationButtons'
import PaginationButtonArea from './PaginationButtonArea'
import pagination from '../common/pagination'

class Pagination extends React.Component {
  /**
   * 
   * @param {getData} props must return the data with the maximum to retrieve
   */
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      data: this.props.data || [],
      max: 1,
      numberOfPagesShown: 10,
      entriesOnPage: 10,
      maxNumberOfEntries: 18000
    }
    this.state.max = Math.floor(this.state.maxNumberOfEntries - this.state.entriesOnPage)
    this.pagination = new pagination(props.getData, this.state.entriesOnPage, this.state.maxNumberOfEntries)
    this.changeCurrentPage = this.changeCurrentPage.bind(this)
  }

  componentWillMount() {
    this.changeCurrentPage(1)
  }

  setMax(data) {
    let max = data ? Math.floor(data.length / this.state.entriesOnPage) : 1
    this.setState({max: max})
  }

  changeCurrentPage(num) {
    if (num <= 1) {
      this.state.currentPage = 1
    }
    else if (num > this.state.max) {
      this.state.currentPage += this.state.max
    } else {
      this.state.currentPage = num
    }
    let fetchBegin = this.state.currentPage * this.state.entriesOnPage
    let fetchEnd = fetchBegin + this.state.entriesOnPage
    let data = this.props.getData(fetchBegin, fetchEnd)
    this.setState({currentPage: this.state.currentPage, data})

    this.pagination.getData(this.state.currentPage).then(data => {
      this.setState({data})
    })
  }

  render() {
    return (
      <div>
        <Table data={this.state.data} headers={this.props.headers} id="id" />
        <PaginationButtonArea {...this.state}/>
      </div>
    )
  }
}

export default Pagination
