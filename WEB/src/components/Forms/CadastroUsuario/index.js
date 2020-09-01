import React from 'react';
import './styles.css';
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Constants } from '../../../configs/constants' 
import { create } from 'services/user'
import { showNotification } from 'components/Notification';

class CadastroUsuario extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			lastName: '',
			email: '',
			whatsapp: '',
			password: '',
			confirmPassword: '',
			errors: {},
			errorMessage: '',
		}
	}

	async registrarUsuario(usuario) {
		return await create(usuario, false)
	}

	validName(name) {
		return (!!name && name.length > 0 && name.length <= 30)
	}

	validLastName(lastName) {
		return (!!lastName && lastName.length > 0 && lastName.length <= 50)
	}

	validEmail(email){
		return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	} 
	validPassword(password) {
		return (!!password && password.length >= 6 && password.length <= 11)
	}
	validWhatsApp(whatsapp){
		return (!!whatsapp && whatsapp.length > 8 && whatsapp.length <= 11)
	}

	handleSubmit = async event => {
		event.preventDefault();

		if(!this.validName(this.state.name)) {
			this.setState({errors: { name: true }})
			return;
		}
		if(!this.validLastName(this.state.lastName)) {
			this.setState({errors: { lastName: true }})
			return;
		}
		if(!this.validEmail(this.state.email)) {
			this.setState({errors: { email: true }})
			return;
		}
		if ((this.state.whatsapp).length < 8){
			this.setState({
				errors: {errors: {whatsapp: true}},
				errorMessage: "WhatsApp invalido!"
			})
			return;
		}
		if (((this.state.whatsapp).length >= 8) && (this.state.whatsapp).length < 11)
		{
			this.setState({
				errors: {errors: {whatsapp: true}},
				errorMessage: "Adicione o DDD junto ao Whatsapp!"
			})
			return;
		}

		if(!this.validPassword(this.state.password)) {
			this.setState({errors: { password: true }})
			return;
		}
		if(this.state.confirmPassword !== this.state.password) {
			this.setState({
				errors: { confirmPassword: true },
				errorMessage: "As senhas não estão iguais"
			
			})
			return;
		}
		

		const user = {
			name: this.state.name,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			whatsapp: this.state.whatsapp
		};

		const registerAttempt = await this.registrarUsuario(user);
		if(registerAttempt) { //cadastro com sucesso já loga o usuário e vai pra tela de entrada
			if (registerAttempt.statusCode !== Constants.successCode) { 
				this.setState({
					errorMessage: registerAttempt.statusDesc
				})
				return false;
			} else {
				const {history} = this.props
				history.push(this.props.goToNewRequest ? '/FacaPedido' : '/')
				this.props.closeModal()
				this.props.refreshHeader()
				showNotification('Cadastro efetuado com sucesso. Bem-vindo ao RevivArq!')
				this.props.backToLogin()
				return true;
			}
		} else {
			return false;
		}
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { name, lastName, email, whatsapp, password, confirmPassword, errors } = this.state

		return (
			<div className="cadastro-container">
				<form onSubmit={this.handleSubmit} className="form-cadastro-usuario">
					<h1>Cadastro de Usuário</h1>
					<TextField
						className="input"
						name="name"
						label="Nome"
						onChange={e => this.setState({ name: e.target.value })}
						error={errors.name}
						value={name}
						autoComplete="name"
						inputProps = {{ maxLength: 30}}
					/>
					<TextField
						className="input"
						name="lastName"
						label="Sobrenome"
						onChange={e => this.setState({ lastName: e.target.value })}
						error={errors.lastName}
						value={lastName}
						autoComplete="lastname"
						inputProps = {{ maxLength: 50}}
					/>
					<TextField
						className="input"
						name="email"
						label="E-mail"
						onChange={e => this.setState({ email: e.target.value })}
						error={errors.email}
						value={email}
						autoComplete="email"
						inputProps = {{ maxLength: 30}}
					/>
					<TextField
						className="input"
						name="whatsapp"
						label="WhatsApp"
						onChange={e => this.setState({ whatsapp: e.target.value })}
						error={errors.whatsapp}
						value={whatsapp}
						inputProps = {{ maxLength: 11}}
					/>
					<TextField
						className="input"
						name="password"
						label="Senha"
						onChange={e => this.setState({ password: e.target.value })}
						error={errors.password}
						value={password}
						type="password"
						inputProps = {{ maxLength: 11}}
					/>
					<TextField
						className="input"
						name="confirmPassword"
						label="Confirmar senha"
						onChange={e => this.setState({ confirmPassword: e.target.value })}
						error={errors.confirmPassword}
						value={confirmPassword}
						type="password"
						inputProps = {{ maxLength: 11}}
					/>
					<span className="cadastro-error-message" >{this.state.errorMessage}</span>
					<Button
						className="submitBtn"
						type="submit">Cadastrar</Button>
					<Button
						className="submitBtn"
						type="submit"
						onClick= {() => this.props.backToLogin()}
					>Voltar</Button>
				</form>
			</div>
		)
	}


}

export default withRouter(CadastroUsuario)
