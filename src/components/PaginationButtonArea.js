import React from 'react'
import PaginationButtons from './PaginationButtons'

/**
 * 
 * @param {currentPage} props 
 * @param {max} props
 * @param {changeCurrentPage} props
 * @param {numberOfPagesShown} props
 */
const PaginationButtonArea = function (props) {
  let disablePrevious = props.currentPage === 1
  let disableNext = props.max === props.currentPage
  return (
    <div className="pagination-buttonsArea">
      <button 
        className="btn btn-primary"
        onClick={() => props.changeCurrentPage(props.currentPage - 1)}
        disabled={disablePrevious}
      >{"<--Prev"}</button>
      <PaginationButtons 
        {...props} 
        changeCurrentPage={props.changeCurrentPage}
      />
      <button 
        className="btn-success btn"
        disabled={disableNext}
        onClick={() => props.changeCurrentPage(props.currentPage + 1)}
      >{"Next-->"}</button>
  </div>)
}

export default PaginationButtonArea