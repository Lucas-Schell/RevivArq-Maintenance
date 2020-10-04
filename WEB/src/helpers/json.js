import React from 'react'

export const show_stringify = (title, props, key) => {
    return (
        <div key={key}>
            <h4>{title}</h4>
            <pre>{JSON.stringify(props, null, 2)}</pre>
            <br />
        </div>
    )
}
