import React from 'react'


const TableHeader = function (props) {
    let headers = props.data.map(h => <th key={h}>{h}</th>)
    return (
        <thead>
            <tr>{headers}</tr>
        </thead>
    )
}

export default TableHeader
