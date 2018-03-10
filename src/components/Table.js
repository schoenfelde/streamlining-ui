import React from 'react'
import TableHeader from './TableHeader'
import RowData from './RowData'

/**
 * 
 * @param {Data} props.data
 * @param {Header} props.headers
 */
const Table = function (props) {
    let headers = props.headers.map(h => h.name)
    let colFields = props.headers.map(h => {
        if (h.field) {
            return h.field
        } else {
            return h
        }
    })
    return (
        <table>
            <TableHeader data={headers} />
            <tbody>
                <RowData data={props.data} fields={colFields} id={props.id} />
            </tbody>
        </table>
    )
}

export default Table
