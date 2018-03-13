import React from 'react'
import TableHeader from './TableHeader'
import RowData from './RowData'

/**
 * 
 * @param {Data} props.data
 * @param {Header} props.headers
 * @param {headerType} props.headerType
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
        <table className="table table-striped table-condensed">
            <TableHeader data={headers} type={props.headerType} />
            <tbody>
                <RowData data={props.data} fields={colFields} id={props.id} />
            </tbody>
        </table>
    )
}

export default Table
