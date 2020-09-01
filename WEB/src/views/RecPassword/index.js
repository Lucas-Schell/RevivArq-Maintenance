import React from 'react'
import './styles.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withRouter } from 'react-router-dom'
import { Constants } from 'configs/constants';
import { showNotification } from 'components/Notification';
import { genNewPassword } from 'services/auth'

class RecPass extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			password: '',
			confirm: '',
			passCode: '',
			isLoading: false,
			errors: {}
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}


	async onSubmit(e) {
		e.preventDefault()
		this.setState({
			isLoading: true,
		})
		const { passCode, password, confirm } = this.state

		if (!passCode) {
			await this.setState({ isLoading: false, errors: { passCode: true } })
			return
		}
		if (!password) {
			await this.setState({ isLoading: false, errors: { password: true } })
			return
		}
		if (!confirm) {
			await this.setState({ isLoading: false, errors: { confirm: true } })
			return
		}

		if (password !== confirm) {
			await this.setState({
				password: '',
				confirm: '',
				isLoading: false,
				errors: { password: true, confirm: true }
			})
			showNotification("A Confirmação difere da senha informada.", '', 'danger')
			return
		}

		const response = await genNewPassword({ email: this.props.email, password, passCode })

		if (!!response && response.statusCode === Constants.successCode) {
			showNotification(response.data.message)
			this.props.backToLogin()
		} else {
			showNotification(response.statusDesc, '', 'danger')
			this.setState({ passCode: '', password: '', confirm: '' })
		}

		this.setState({ isLoading: false, passCode: '', password: '', confirm: '' })
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { passCode, password, confirm, isLoading, errors } = this.state

		return (
			<div className="recpass-container">
				<form className="form-recpass-usuario" onSubmit={this.onSubmit}>
					<h1 style={{ width: '410px', textAlign: 'center' }}>Informe abaixo o código recebido por e-mail e a nova senha desejada.</h1>
					<TextField
						className="input"
						name="passCode"
						label="Código de recuperação"
						onChange={this.onChange}
						value={passCode}
						error={errors.passCode}
						type="passCode"
						autoComplete="passCode"
						inputProps={{ maxLength: 16 }}
					/>
					<TextField
						className="input"
						name="password"
						label="Senha"
						onChange={this.onChange}
						value={password}
						error={errors.password}
						type="password"
						autoComplete="password"
						inputProps={{ maxLength: 11 }}
					/>
					<TextField
						className="input"
						name="confirm"
						label="Confime a senha"
						onChange={this.onChange}
						value={confirm}
						error={errors.confirm}
						type="password"
						autoComplete="confirm"
						inputProps={{ maxLength: 11 }}
					/>
					<br />
					<Button
						className="submitBtn"
						type="submit"
						disabled={isLoading}
					>Alterar senha</Button>
					<br />
				</form>
				{/* {show_stringify('Login Form State', this.state, 'login_state')} */}
			</div>
		)
	}
}

export default withRouter(RecPass)