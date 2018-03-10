import React from 'react'
import Row from './Row'


const RowData = function (props) {
    let rows = props.data.map(d => <Row data={d} fields={props.fields} key={d[props.id]} />)
    return rows
}

export default RowData
