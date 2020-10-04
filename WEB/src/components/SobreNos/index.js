import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'

class SobreNos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { display } = this.props
        const { render } = this.state
        return <div>Hello World</div>
    }
}

export default withRouter(SobreNos)
