import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Grid } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false)
    const { user, onChange, handleSubmit } = props

    const submit = () => {
        handleSubmit()
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Button
                style={{ backgroundColor: 'white', margin: 15 }}
                onClick={handleClickOpen}
            >
                Detalhes do Usuário
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <Grid
                    container
                    item
                    xs={12}
                    spacing={12}
                    style={{ backgroundColor: '#FFF829' }}
                >
                    <Grid item xs={12}>
                        <DialogTitle
                            fullWidth
                            xs={12}
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Perfil
                        </DialogTitle>
                    </Grid>

                    <Grid item xs={12}>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="name"
                                        label="Nome"
                                        value={user.name ? user.name : ''}
                                        onChange={onChange}
                                        style={{ backgroundColor: '#f5f5f5' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="lastName"
                                        label="Sobrenome"
                                        value={
                                            user.lastName ? user.lastName : ''
                                        }
                                        onChange={onChange}
                                        style={{ backgroundColor: '#f5f5f5' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="whatsapp"
                                        label="Celular"
                                        value={
                                            user.whatsapp ? user.whatsapp : ''
                                        }
                                        onChange={onChange}
                                        style={{ backgroundColor: '#f5f5f5' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="cpf"
                                        label="CPF"
                                        value={user.cpf ? user.cpf : ''}
                                        onChange={onChange}
                                        style={{ backgroundColor: '#f5f5f5' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="cnpj"
                                        label="CNPJ"
                                        value={user.cnpj ? user.cnpj : ''}
                                        onChange={onChange}
                                        style={{ backgroundColor: '#f5f5f5' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Estado Civil</InputLabel>
                                        <Select
                                            label="Estado Civil"
                                            name="civilStatus"
                                            value={
                                                user.civilStatus
                                                    ? user.civilStatus
                                                    : ''
                                            }
                                            onChange={onChange}
                                            style={{
                                                backgroundColor: '#f5f5f5'
                                            }}
                                        >
                                            <MenuItem value="Solteiro(a)">
                                                Solteiro(a)
                                            </MenuItem>
                                            <MenuItem value="Casado(a)">
                                                Casado(a)
                                            </MenuItem>
                                            <MenuItem value="Divorciado(a)">
                                                Divorciado(a)
                                            </MenuItem>
                                            <MenuItem value="Viúvo(a)">
                                                Viúvo(a)
                                            </MenuItem>
                                            <MenuItem value="Separado(a)">
                                                Separado(a)
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Grid>

                    <Grid item xs={12}>
                        <DialogActions style={{ justifyContent: 'center' }}>
                            <Button
                                onClick={submit}
                                style={{
                                    color: 'white',
                                    width: '80%',
                                    backgroundColor: '#152620',
                                    '&:hover': {
                                        opacity: 0.9,
                                        backgroundColor: '#152620'
                                    }
                                }}
                            >
                                Atualizar Dados
                            </Button>
                        </DialogActions>
                    </Grid>
                </Grid>
            </Dialog>
        </Grid>
    )
}
