import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    cssUnderline: {
        '&:after': {
            borderBottomColor: 'black'
        }
    },
    inputCenter: {
        textAlign: 'center',
        color: 'red'
    }
})

const ChatMessageBox = ({ text, author }) => {
    const classes = useStyles()
    return (
        <TextField
            fullWidth
            style={{ width: '300px', margin: 5, textAlign: 'right' }}
            classes={{
                input: classes.inputCenter
            }}
            label={author}
            multiline
            defaultValue=". . ."
            value={text}
            variant="filled"
        />
    )
}

export default ChatMessageBox
