import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import SendIcon from '@material-ui/icons/Send'

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
        <div>
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
                    xs={12}
                    spacing={12}
                    style={{ backgroundColor: '#FFF829' }}
                >
                    <Typography>AAAA</Typography>
                </Grid>
            </Dialog>
        </div>
    )
}
