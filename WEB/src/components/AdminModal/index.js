import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false)
    const { loadInfos, onChange, onSubmit, about, found1, found2 } = props

    const submit = () => {
        onSubmit()
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        loadInfos()
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Informações da Home</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>Admin Text Changer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Mude o texto da tela home aqui!
                    </DialogContentText>
                </DialogContent>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="about"
                        label="Sobre Nós"
                        value={about}
                        onChange={onChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="found1"
                        label="Bio Carolina"
                        value={found1}
                        onChange={onChange}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="found2"
                        label="Bio Vanessa"
                        value={found2}
                        onChange={onChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={submit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
