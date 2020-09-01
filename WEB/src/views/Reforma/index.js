import React from 'react'
import { withRouter } from 'react-router-dom'

// Biblioteca de Componentes
import EditReformForm from 'components/Forms/EditReformForm'

// Views
import Page from 'views/Page';

// Serviços
import { editReform } from 'services/reforms'

class Reforma extends Page {

	//chama para api para editar a solicitação reforma...
	async editarReforma(reform) {
		return await editReform(reform, false)
	}

	authenticated = () => {
		return (
			<div style={{ display: 'flex', flexDirection: 'row ', alignItems: 'center', justifyContent: 'center' }} >
				<EditReformForm title="Editar Reforma" history={this.props.history} onSubmit={this.editarReforma} reform={this.props.location.state.reform} />
			</div>
		)
	}

}

export default withRouter(Reforma) 