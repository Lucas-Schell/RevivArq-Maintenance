import React from 'react'
import Page from 'views/Page'
import './styles.css'
import Typography from '@material-ui/core/Typography'
import ReformForm from 'components/Forms/ReformForm'

class FacaPedido extends Page {
    constructor(props) {
        super(props)
    }

    unauthenticated = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40vh'
                }}
            >
                <Typography
                    variant="overline"
                    className="txtIni"
                    style={{
                        fontSize: 40,
                        color: 'white',
                        fontFamily: 'Playfair Display'
                    }}
                    gutterBottom
                >
                    Em Breve
                </Typography>
            </div>
        )
    }

    authenticated = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row ',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ReformForm
                    title={
                        this.props.location.state
                            ? this.props.location.state.title
                            : 'Fazer um Orçamento'
                    }
                    history={this.props.history}
                    reform={
                        this.props.location.state
                            ? this.props.location.state.reform
                            : undefined
                    }
                />
            </div>
        )
    }
}

export default FacaPedido
