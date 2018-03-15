import React from 'react'
import TableHeader from './TableHeader'
import RowData from './RowData'
import ScrollingHOC from './ScrollingHOC'

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
                {props.data && props.data.length > 0 &&
                    <RowData data={props.data} fields={colFields} id={props.id} />
                }
            </tbody>
        </table>
    )
}

export default Table

export const StreamlinedTable = ScrollingHOC(Table)
