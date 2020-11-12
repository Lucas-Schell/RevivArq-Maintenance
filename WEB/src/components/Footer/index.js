import React from 'react'
import './styles.css'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import logo_ages from '../../Assets/logo_ages.png'
import Grid from '@material-ui/core/Grid'

class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: null,
            render: null
        }
    }

    redirect = (path) => {
        const { history } = this.props
        history.push(path)
    }

    render() {
        return (
            <Grid container className={'App-footer'}>
                <img src={logo_ages} className="img" alt="logo_ages" />
                <Typography>
                    Agência Experimental de Engenharia de Software - PUCRS -
                    Escola Politécnica. Todos os direitos reservados ©.
                </Typography>
            </Grid>
        )
    }
}

export default withRouter(Footer)
