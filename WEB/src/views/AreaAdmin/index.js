import React from 'react'
import Page from 'views/Page'
import { validToken } from 'services/auth'
import AreaAdminComponent from '../../components/AreaAdmin/index.js'

class AreaAdmin extends Page {
    componentWillMount() {
        this.renderAdmin()
    }

    componentDidMount() {
        const admin = sessionStorage.getItem('isAdmin')
        this.setState({
            isAdmin: admin
        })
        console.log(admin)
    }

    renderAdmin = async () => {
        try {
            const isAuthenticated = await validToken()
            const admin = this.state.isAdmin

            if (!isAuthenticated) {
                this.redirect('/Erro403')
            } else {
                if (admin === 'false') {
                    console.log('Entrou-cliente')
                    this.redirect('/Erro403')
                } else if (admin === 'true') {
                    console.log('Entrou-admin')
                    this.render(this.authenticated())
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    unauthenticated = () => {
        return <div>Deslogado</div>
    }

    authenticated = () => {
        return (
            <div>
                <AreaAdminComponent />
            </div>
        )
    }
}

export default AreaAdmin
