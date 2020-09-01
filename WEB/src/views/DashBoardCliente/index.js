import React from 'react'
import Page from 'views/Page';
import './styles.css';

class DashBoardCliente extends Page {
 
	unauthenticated = () => {
		return (	
			
			
				<h1>Erro 403</h1>		
			
		)
	}

	authenticated = () => {
		return (
			<DashBoardCliente/>
		)

	}
}

export default DashBoardCliente