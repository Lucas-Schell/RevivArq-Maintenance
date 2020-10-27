import React from 'react'
import { withRouter } from 'react-router-dom'

class UserEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lastName: '',
            whatsapp: '',
            cpf: '',
            cnpj: '',
            civilStatus: '',
            address: {
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                uf: ''
            },
            errors: {}
        }
    }

    componentDidMount() {
        const { user } = this.props

        if (user) {
            this.setState({
                name: user.name,
                establishmentType: reform.establishmentType,
                status: reform.status,
                area: reform.area,
                address: reform.address,
                reformItens: reform.reformItens,
                goal: reform.goal,
                restrictions: reform.restrictions,
                budgetLimit: reform.budgetLimit,
                phone: reform.phone
            })
        }
    }
}
export default withRouter(UserEditForm)
