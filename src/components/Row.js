import React from 'react'

const Row = function ({data, fields}) {
    let cols = fields.map(c => {
        if (c.component) {
            return (<td key={data[c.key]}>{
                React.createElement(c.component, {
                data
            })}
            </td>
        )
        } else {
            return <td key={c}>{data[c]}</td>
        }
    })
    return (
        <tr className="rowMargin">
            {cols}
        </tr>
    )
}

export default Row
