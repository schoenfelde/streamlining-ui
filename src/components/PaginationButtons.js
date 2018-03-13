import React from 'react'

/**
 * 
 * @param {numberOfPagesShown} props 
 * @param {currentPage} props
 * @param {max} props
 * @param {changeCurrentPage} props
 * @param {entitiesOnPage} props
 */
const PaginationButtons = function (props) {
  // defaults to 10
  if (props.max === 1) {
    return null
  }
  /**
   * start = 1
   * end = maxNumberOfPages
   */



  let numberOfPagesShown = props.numberOfPagesShown || 10
  let halfPages = (numberOfPagesShown / 2)
  let start = 1
  let end = numberOfPagesShown
  let maxNumberOfPages = Math.floor(props.max / props.entriesOnPage)
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
  end = Math.min(end, maxNumberOfPages)
  let dif = end - start
  if (dif < numberOfPagesShown) {
    start = end - numberOfPagesShown
  }
  let buttonsToMake = []
  for (let i = start; i <= end; i++) {
    buttonsToMake.push(i)
  }
  let buttons = buttonsToMake.map(i => {
    if (i === props.currentPage) {
      return (
        <button key={"button" + i} className="btn paginationButton btn-primary" >
          {i}
        </button>
      )
    } else {
      return (
        <button key={"button" + i} className="btn paginationButton" onClick={() => props.changeCurrentPage(i)}>
          {i}
        </button>
      )
    }
  })
  return <span>
    {buttons}
    {end < props.max &&
      <span>
        {end !== maxNumberOfPages &&
          <span>
            <span>{"..."}</span>
            <button 
              className="btn paginationButton" 
              onClick={() => props.changeCurrentPage(maxNumberOfPages)}>
              {maxNumberOfPages}
            </button>
          </span>
        }
      </span>
    }
  </span>
}

export default PaginationButtons
