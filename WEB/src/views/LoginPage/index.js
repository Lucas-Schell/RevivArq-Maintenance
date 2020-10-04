import React from 'react'
import Page from 'views/Page'
import LoginForm from 'components/Forms/LoginForm'

class LoginPage extends Page {
    authenticated = () => {
        return (
            <div className="container">
                <p>Você já está logado!</p>
            </div>
        )
    }

    unauthenticated = () => {
        return (
            <div>
                <LoginForm />
            </div>
        )
    }
}

export default LoginPage
