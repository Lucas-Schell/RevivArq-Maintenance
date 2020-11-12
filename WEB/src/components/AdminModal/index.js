import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

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
            <Button
                style={{ backgroundColor: 'white', margin: 15 }}
                onClick={handleClickOpen}
            >
                Editar informações da HomePage
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
                    style={{ backgroundColor: '#FFF829' }}
                >
                    <Grid item xs={12}>
                        <DialogTitle
                            xs={12}
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Editar informações da tela inicial
                        </DialogTitle>
                    </Grid>

                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    name="about"
                                    label="Sobre Nós"
                                    value={about}
                                    onChange={onChange}
                                    style={{ backgroundColor: '#f5f5f5' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    name="found1"
                                    label="Bio Carolina"
                                    value={found1}
                                    onChange={onChange}
                                    style={{ backgroundColor: '#f5f5f5' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    name="found2"
                                    label="Bio Vanessa"
                                    value={found2}
                                    onChange={onChange}
                                    style={{ backgroundColor: '#f5f5f5' }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Grid
                        container
                        item
                        style={{ width: '100%', paddingBottom: 10 }}
                        xs={12}
                        justify="space-around"
                    >
                        <Grid item xs={4}>
                            <Button
                                fullWidth
                                onClick={handleClose}
                                style={{
                                    color: 'white',
                                    backgroundColor: '#152620',
                                    '&:hover': {
                                        opacity: 0.9,
                                        backgroundColor: '#152620'
                                    }
                                }}
                            >
                                Fechar
                            </Button>
                        </Grid>

                        <Grid item xs={4}>
                            <Button
                                fullWidth
                                onClick={submit}
                                style={{
                                    color: 'white',
                                    backgroundColor: '#152620',
                                    '&:hover': {
                                        opacity: 0.9,
                                        backgroundColor: '#152620'
                                    }
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}
