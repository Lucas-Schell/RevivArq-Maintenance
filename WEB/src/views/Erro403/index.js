import React from 'react'
import Page from 'views/Page';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import './styles.css';

class Erro403 extends Page {
 
	unauthenticated = () => {
		return (	
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
				<Typography style={{ variant:"overline",color:'white', fontSize:40, fontFamily:'Playfair Display'}}>Você está tentando acessar uma área proibida, retorne para o <a href="/" style={{color:"white"}}>início.</a></Typography>
			</div>
			
		)
	}

	authenticated = () => {
		return (
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
				<Typography style={{ variant:"overline",color:'white', fontSize:40, fontFamily:'Playfair Display'}}>Você está tentando acessar uma área proibida, retorne para o <a href="/" style={{color:"white"}}>início.</a></Typography>
			</div>
		)

	}

}

export default Erro403