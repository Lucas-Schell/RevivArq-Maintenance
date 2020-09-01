import React from 'react'
import './styles.css'

import Page from 'views/Page';

import UserForm from 'components/Forms/UserForm'


class EditUserPage extends Page {
	
	authenticated = () => {
        return (
            <div className="container">
                <h1>Cadastro de Usuário</h1>
				<UserForm reloadOnSubmission={true}/>
			</div>
        )
    }

    unauthenticated = () => {
        return (
            <div className="container">
                <p>Você precisa estar logado para cadastrar usuários!</p>
            </div>
        )
    }
}

export default EditUserPage 