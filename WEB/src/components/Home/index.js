import React from 'react'
import { withRouter } from 'react-router-dom'
import { getTexts } from '../../services/home'

class HomeTexts extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '' }

        this.getText = this.getText.bind(this)
    }

    async getText() {
        const { text } = this.props

        const texts = await getTexts()

        if (texts) {
            this.setState({ text: texts[text] })
        }
    }

    componentDidMount() {
        this.getText()
    }

    render() {
        return this.state.text
    }
}

export default withRouter(HomeTexts)
