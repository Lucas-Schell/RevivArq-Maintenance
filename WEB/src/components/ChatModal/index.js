import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { IconButton, Typography } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import SendIcon from '@material-ui/icons/Send'
import './styles.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const { onSubmit, isAdmin, id, chat } = props

    const send = () => {
        const reform = { _id: id, updateChat: true, chat: { message: msg } }
        onSubmit(reform)
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
                    <div class="chat">
                        {chat.map((item) => (
                            <div
                                className={
                                    (
                                        isAdmin
                                            ? item.author !== 'Kenai'
                                            : item.author === 'Kenai'
                                    )
                                        ? 'chatItem chatLeft'
                                        : 'chatItem chatRight'
                                }
                            >
                                <p class="author">{item.author}</p>
                                <p class="message">{item.message}</p>
                            </div>
                        ))}
                    </div>

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
                                value={msg}
                                onChange={(e) => {
                                    setMsg(e.target.value)
                                }}
                            />
                        </Grid>

                        <Grid item>
                            <IconButton>
                                <SendIcon onClick={send} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}
