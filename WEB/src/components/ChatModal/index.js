import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { IconButton, Typography } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import SendIcon from '@material-ui/icons/Send'
import ChatMessageBox from '../ChatMessageBox'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false)
    const { onSubmit } = props
    //const { chat } = props
    const chat = [
        { author: 'admin', message: 'oi' },
        { author: 'joao', message: 'ola' }
    ]

    const send = () => {
        onSubmit()
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <ChatIcon
                style={{ cursor: 'pointer', color: 'rgb(21,38,32)' }}
                onClick={handleClickOpen}
            />

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <Grid
                    container
                    item
                    style={{
                        backgroundColor: '#FFF829',
                        width: '100%',
                        height: '70vh',
                        padding: 10
                    }}
                >
                    <Grid item xs={12}>
                        <Typography style={{ textAlign: 'center' }}>
                            Chat
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        style={{ height: '83%', display: 'inline' }}
                    >
                        <Grid item xs={12} justify="flex-end">
                            <ChatMessageBox
                                text={
                                    'oioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioi'
                                }
                                author={'danza kuduro'}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <ChatMessageBox
                                text={'dsafdsgbfdnbgngfdbgndfgfb'}
                                author={'danza kuduro'}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        xs={12}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="textbox"
                                label="Escreva aqui sua mensagem"
                                rows={4}
                            />
                        </Grid>

                        <Grid item>
                            <IconButton>
                                <SendIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}
