import React from 'react'
import './styles.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { genPassCode } from 'services/auth'
import { withRouter } from 'react-router-dom'
import { Constants } from 'configs/constants';
import { showNotification } from 'components/Notification';

class Email extends React.Component { // Uma das varias maneiras de proteger uma rota é criar uma Rota protegida e usa-la com herança. Ver ProtectedPage para entender a lógica

	constructor(props) {
		super(props)
		this.state = {
			email: '',
			isLoading: false,
			errors: {}
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	async onSubmit(e) {
		e.preventDefault()
		this.setState({ isLoading: true })
		const { email } = this.state
		if (!email) {
			await this.setState({ isLoading: false, errors: { email: true } })
			return
		}

		const response = await genPassCode({ email })

		if (!!response && response.statusCode === Constants.successCode) {
			showNotification("Um código de recuperação foi enviado para o seu e-mail! por favor informe abaixo juntamente com a nova senha desejada", '', 'warning')
			this.props.setRecEmail(email)
			this.props.goToRecPass()
		} else {
			showNotification(response.statusDesc, '', 'danger')
			this.setState({ email: '' })
		}
		this.setState({ isLoading: false, email: '' })
	}



	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { email, isLoading, errors } = this.state

		return (
			<div className="email-container">
				<form className="form-email-usuario" onSubmit={this.onSubmit}>
					<h1 style={{ width: '400px', textAlign: 'center' }}>Para Recuperar sua conta informe o seu e-mail cadastrado abaixo.</h1>
					<TextField
						className="input"
						name="email"
						label="Email"
						onChange={this.onChange}
						error={errors.email}
						value={email}
						type="email"
						autoComplete="email"
					/>

					<br />
					<Button
						className="submitBtn"
						type="submit"
						disabled={isLoading}
					>Enviar</Button>
					<Button
						className="submitBtn"
						type="submit"
						onClick={() => this.props.backToLogin()}
					>Voltar</Button>
					<br />

				</form>
				{/* {show_stringify('Login Form State', this.state, 'login_state')} */}
			</div>
		)
	}
}

export default withRouter(Email) 