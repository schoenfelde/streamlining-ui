import React from 'react'


const TableHeader = function (props) {
    let typeClass = props.headerType || "center"
    let headers = props.data.map(h => <th style={{textAlign: typeClass}} key={h}>{h}</th>)
    return (
        <thead>
            <tr>{headers}</tr>
        </thead>
    )
}

export default TableHeader
