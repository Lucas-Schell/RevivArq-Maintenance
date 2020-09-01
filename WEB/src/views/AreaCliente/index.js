import React from 'react';
import Page from 'views/Page';
import './styles.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AreaClienteComponente from '../../components/AreaCliente/index.js';

class AreaCliente extends Page {

	unauthenticated = () => {
		return (	
			<div>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
							<Typography variant="overline" className="txtIni" style={{ fontSize: 40, color: 'white', fontFamily:'Playfair Display' }} gutterBottom>
								Cadastre-se para ter acesso a todas funcionalidades da plataforma Revivarq
							</Typography>
				</div>
			</div>			
			
		)
	}

	authenticated = () => {
		return (
				<div>
				<AreaClienteComponente history={this.props.history} />
				</div>
		)

	}
}

export default AreaCliente