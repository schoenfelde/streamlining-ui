import React from 'react'

export default PaginationButtonArea = function (props) {
  let disablePrevious = props.currentPage === 1
  let disableNext = props.max === props.currentPage
  return (
    <div className="pagination-buttonsArea">
    <div className="pagination-previous-button">
      <button 
        className="btn btn-primary"
        onClick={() => props.changeCurrentPage(props.currentPage - 1)}
        disabled={disablePrevious}>
        {"<--Prev"}
      </button>
    </div>
    <PaginationButtons {...props} changeCurrentPage={props.changeCurrentPage} />
    <div className="pagination-next-button">
      <button 
        className="btn-success btn"
        disabled={disableNext}
        onClick={() => props.changeCurrentPage(props.currentPage + 1)}
      >
        {"Next-->"}
      </button>
    </div>
  </div>)
}
