import React, { useState } from 'react'
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
    const { onSubmit, isAdmin, id, messages, name, updateChat } = props

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [chat, setChat] = useState(messages)

    const send = async () => {
        const reform = { _id: id, updateChat: true, chat: { message: msg } }
        setChat(await onSubmit(reform))
        setMsg('')
        let elem = document.getElementById('chat')
        elem.scrollTop = elem.scrollHeight
    }

    const handleClickOpen = async () => {
        setChat(await updateChat(id))
        setMsg('')
        setOpen(true)
        let elem = document.getElementById('chat')
        elem.scrollTop = elem.scrollHeight
    }

    const handleClose = () => {
        setOpen(false)
    }

    function att() {
        setTimeout(async function () {
            setChat(await updateChat(id))
            att()
        }, 1000)
    }

    return (
        <Grid container justify="center" alignItems="center">
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
                            {open.toString()}
                        </Typography>
                    </Grid>
                    <div id="chat" class="chat">
                        {chat.map((item) => (
                            <div>
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
                                    <p class="author">
                                        {item.author === 'Kenai'
                                            ? 'Kenai'
                                            : name}
                                    </p>
                                    {item.message.split('\n').map((i, key) => {
                                        return (
                                            <p key={key} class="message">
                                                {i}
                                            </p>
                                        )
                                    })}
                                </div>
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
                                multiline
                                fullWidth
                                variant="outlined"
                                name="textbox"
                                label="Escreva aqui sua mensagem"
                                rowsMax={4}
                                value={msg}
                                onChange={(e) => {
                                    setMsg(e.target.value)
                                }}
                                onSubmit={send}
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
        </Grid>
    )
}
