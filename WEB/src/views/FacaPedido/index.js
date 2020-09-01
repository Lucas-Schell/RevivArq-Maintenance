import React from 'react';
import Page from 'views/Page';
import './styles.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ReformForm from 'components/Forms/ReformForm'

class FacaPedido extends Page {

	constructor(props) {
		super(props)
	}

	unauthenticated = () => {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
				<Typography variant="overline" className="txtIni" style={{ fontSize: 40, color: 'white', fontFamily: 'Playfair Display' }} gutterBottom>
					Em Breve
							</Typography>
			</div>
		)
	}

	authenticated = () => {
		return (
			<div style={{ display: 'flex', flexDirection: 'row ', alignItems: 'center', justifyContent: 'center' }} >
				<ReformForm title="Solicitar Reforma" />
			</div>
		)
	}
}

export default FacaPedido