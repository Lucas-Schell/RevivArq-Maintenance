import React from 'react'
import { withRouter } from 'react-router-dom'
// import {show_stringify} from 'helpers/json'

// Serviços

// Biblioteca de Componentes

/**
 *  Recomendo substituir este Header por um header advindo de uma biblioteca de componentes
 */

class FacaPedido extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        //console.log('Show Header?', props.display)
    }

    render() {
        return <div>Hello World</div>
    }
}

export default withRouter(FacaPedido)
