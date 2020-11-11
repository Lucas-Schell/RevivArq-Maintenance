import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false)
    const { user, onChange, onSubmit } = props

    const submit = () => {
        onSubmit()
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Detalhes do Usuário</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>Pefil</DialogTitle>
                <DialogContent>
                    <DialogContentText>Detalhes do Usuário</DialogContentText>
                </DialogContent>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="name"
                        label="Nome"
                        value={user.name}
                        onChange={onChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="surname"
                        label="Sobrenome"
                        value={user.lastName}
                        onChange={onChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="phone"
                        label="Celular"
                        value={user.whatsapp}
                        onChange={onChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="cpf"
                        label="CPF"
                        value={user.cpf}
                        onChange={onChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="cnpj"
                        label="CNPJ"
                        value={user.cnpj}
                        onChange={onChange}
                    />

                    <FormControl>
                        <InputLabel>Estado Civil</InputLabel>
                        <Select
                            name="status"
                            value={user.civilStatus}
                            onChange={onChange}
                        >
                            <MenuItem value={'Solteiro(a)'}>
                                Solteiro(a)
                            </MenuItem>
                            <MenuItem value={'Casado(a)'}>Casado(a)</MenuItem>
                            <MenuItem value={'Divorciado(a)'}>
                                Divorciado(a)
                            </MenuItem>
                            <MenuItem value={'Viúvo(a)'}>Viúvo(a)</MenuItem>
                            <MenuItem value={'Separado(a)'}>
                                Separado(a)
                            </MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submit}>Atualizar Dados</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
