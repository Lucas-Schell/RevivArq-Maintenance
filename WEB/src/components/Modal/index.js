import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import './modal.css'

type Props = {
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const styles = {}

class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue)
    }

    handleListItemClick = (value) => {
        this.props.onClose(value)
    }

    render() {
        const {
            onClose,
            selectedValue,
            title,
            noCloseButton,
            maxWidth = 'md',
            fullWidth = false,
            ...other
        } = this.props
        return (
            <Dialog
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                {...other}
            >
                <div className="dialog-content-container">
                    <div className="dialog-content-header">
                        <h3 className="dialog-title">{title}</h3>
                        {noCloseButton ? null : (
                            <span
                                className="dialog-close"
                                onClick={this.handleClose}
                            >
                                x
                            </span>
                        )}
                    </div>
                    {other.children}
                </div>
            </Dialog>
        )
    }
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func,
    selectedValue: PropTypes.string
}

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog)

class Modal extends React.Component<Props> {
    state = {
        open: false
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })

        if (this.props.callBackOpen) this.props.callBackOpen()
    }

    handleClose = (value) => {
        this.setState({ selectedValue: value, open: false })

        if (this.props.callBackClose) this.props.callBackClose()

        if (this.props.resetCallback)
            setTimeout(() => this.props.resetCallback(), 1000)
    }

    render() {
        return (
            <SimpleDialogWrapped
                selectedValue={this.state.selectedValue}
                open={this.props.open}
                onClose={this.handleClose}
                {...this.props}
            />
        )
    }
}

export default Modal;
