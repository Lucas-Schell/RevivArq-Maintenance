import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import UserForm from 'components/Forms/UserForm'

/**
 * Propriedades:
 *    id: ID do suuário que deseja-se alterar.
 */
export default class UserDialogBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleSubmit = () => {
        this.child.onSubmit()
        this.handleClose()
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>
                    {this.props.id ? 'Editar Usuário' : 'Criar Usuário'}
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Formulário de Usuário
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Digite os seguintes dados para{' '}
                            {this.props.id ? 'atualizar' : 'criar'} um usuário:
                        </DialogContentText>
                        <UserForm
                            hideSubmit={true}
                            reloadOnSubmission={true}
                            onRef={(ref) => (this.child = ref)}
                            id={this.props.id}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            onClick={this.handleSubmit}
                            color="primary"
                        >
                            {this.props.id ? 'Atualizar' : 'Criar'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
