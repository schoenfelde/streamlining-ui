import React from 'react'

/**
 * 
 * @param {numberOfPagesShown} props 
 * @param {currentPage} props
 * @param {max} props
 * @param {changeCurrentPage} props
 */
const PaginationButtons = function (props) {
  // defaults to 10
  if (props.max === 1) {
    return null
  }
  let numberOfPagesShown = props.numberOfPagesShown || 10
  let halfPages = (numberOfPagesShown / 2)
  let start = 1
  let end = numberOfPagesShown
  if (props.currentPage > halfPages) {
    start = props.currentPage - halfPages 
  }
  end = start + numberOfPagesShown
  start = Math.min(start, props.max)
  end = Math.min(end, props.max)
  if (start === props.max) {
    end = start
    start = Math.max(0, end - props.max)
  }
  let buttonsToMake = []
  for (let i = start; i <= end; i++) {
    buttonsToMake.push(i)
  }
  let buttons = buttonsToMake.map(i => {
    return (
      <button key={"button" + i} className="btn paginationButton" onClick={() => props.changeCurrentPage(i)}>
        {i}
      </button>
    )
  })
  return <div>
    {buttons}
    {end < props.max &&
      <span>
        <span >{"..."}</span>
        <button 
          className="btn paginationButton" 
          onClick={() => props.changeCurrentPage(props.max)}>
            {props.max}
          </button>
      </span>
    }
  </div>
}

export default PaginationButtons
