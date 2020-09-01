import React from 'react'
import './styles.css'
import InstaGallery from '../../components/InstaGallery/index.js';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// Biblioteca de Componentes
import carol from '../../Assets/carol.png';
import vanessa from '../../Assets/vanessa.png';
import Divider from '@material-ui/core/Divider';
// Views
import Page from 'views/Page';
import { Button } from '@material-ui/core';

// Serviços

const styles = theme => ({
	root: {
		display: 'flex',

	},
	button: {
		margin: 1,
	},

});


class HomePage extends Page { // Uma das varias maneiras de proteger uma rota é criar uma Rota protegida e usa-la com herança. Ver ProtectedPage para entender a lógica

	constructor(props) {
		super(props);
		this.state = {
			userList: [],
		}
	}

	authenticated = () => {
		return (
			this.unauthenticated()
		);
	};

	unauthenticated = () => {
		const { classes } = this.props;
		return (
			<div>
				<Grid container spacing={3}>

					<Grid item xs={12} className="img" justify='center' style={{ height: 700, alignItems: 'center', objectFit: 'nonen' }}>

						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
							<Typography variant="overline" className="txtIni" style={{ fontSize: 60, color: 'white', fontFamily:'Playfair Display' }} gutterBottom>
								Renovando seu Negócio
							</Typography>
						</div>

					</Grid>

					<Grid item xs={6} >
						<Typography style={{ textAlign: 'right', marginTop: 80, marginRight: 30, fontSize: 60, fontWeight: 'bold', color: 'white' , fontFamily:'Playfair Display'}}>
							QUEM
									<br></br>
							SOMOS
						</Typography>
					</Grid>

					<Grid item xs={6} style={{ textAlign: 'left', justifyContent: 'left', marginTop: 83, fontSize: 20 }}>

						<Typography variant="overline" display="block" style={{ textAlign: 'left', marginLeft: 30, marginRight: 260, marginTop: 15, fontSize: 20, color: 'rgb(255,255,255)', fontFamily:'Playfair Display' }} gutterBottom >
							Somos uma empresa que oferece <b style={{ color: 'rgb(255,248,41)' }}>serviços personalizados</b> de arquitetura e design	para transformar o seu negócio <b style={{ color: 'rgb(255,248,41)' }}>cabendo no seu bolso</b>
						</Typography>

					</Grid>

					<Grid item xs={12} style={{ marginLeft: 60, marginRight: 60, marginTop: 60 }}>

						<Divider variant="middle" style={{ backgroundColor: 'rgb(255,248,41)' }} />

					</Grid>

					<Grid item xs={12} sm={3}>

						<img style={{ marginTop: 80, height: 160, width: 160 }}
							src={carol}
							className="carolAvatar"
							alt="carol"
						></img>

					</Grid>

					<Grid item sm={3} xs={12} style={{ marginLeft: -50 }}>

						<Typography variant="overline" display="block" style={{ textAlign: 'left', marginTop: 100, fontSize: 20, color: 'rgb(255,255,255)', fontWeight: 'bold',fontFamily:'Playfair Display' }} gutterBottom>
							Carolina Santos
						</Typography>

						<Typography variant="overline" display="block" style={{ textAlign: 'left', fontSize: 20, color: 'rgb(255,248,41)', fontWeight: 'bold',fontFamily:'Playfair Display' }} gutterBottom>
							Fundadora
						</Typography>

						<Typography variant="overline" display="block" style={{ textAlign: 'left', marginTop: 15, fontSize: 20, color: 'rgb(255,255,255)', letterSpacing:0.5, fontFamily:'Playfair Display' }} gutterBottom>
							Oi gente! Sou a Carol, uma das arquitetas inquietas da Revivarq! Me formei em Arquitetura e Urbanismo no ano de 2018, na PUCRS.
							Tenho experiência com projetos comerciais, administrativos e licenciamentos.
							Adoro ver as mudanças que a arquitetura pode trazer para as pessoas, pessoal e profissionalmente. Acredito que as mudanças são muito importantes pra que o futuro seja significativo.
							Além de arquiteta, estudo dança e sou uma grande apreciadora de arte. Por isso, adoro relacionar essas duas áreas. Uma boa arquitetura deve ser considerada uma bela obra de arte!
						</Typography>

					</Grid>

					<Grid item xs={12} sm={3}>

						<img style={{ marginTop: 80, height: 160, width: 160 }}
							src={vanessa}
							className="vanessaAvatar"
							alt="vanessa"
						></img>

					</Grid>

					<Grid item xs={12} sm={3} style={{ marginLeft: -50 }}>

						<Typography variant="overline" display="block" style={{ textAlign: 'left', marginTop: 100, fontSize: 20, color: 'rgb(255,255,255)', fontWeight: 'bold', fontFamily:'Playfair Display' }} gutterBottom>
							Vanessa Moreira
						</Typography>

						<Typography variant="overline" display="block" style={{ textAlign: 'left', fontSize: 20, color: 'rgb(255,248,41)', fontWeight: 'bold', fontFamily:'Playfair Display' }} gutterBottom>
							Fundadora
						</Typography>

						<Typography variant="overline" display="block" style={{ textAlign: 'left', marginTop: 15, fontSize: 20, color: 'rgb(255,255,255)', letterSpacing:0.5, fontFamily:'Playfair Display' }} gutterBottom>
							E aí, tudo bacana? Eu sou a Vanessa, arquiteta formada pela PUCRS em 2018 e acredito na desmistificação e democratização da arquitetura.
							Tenho uma trajetória focada no ramo de arquitetura comercial, especialmente trabalhando com grande redes varejistas no cenário nacional.
							Entretanto, acredito que olhar para o empreendedor de bairro e oferecer a ele uma oportunidade de planejamento e reconfiguração de seu espaço de trabalho propicia um benefício para além de seu negócio,
							impactando também a vitalidade urbana e permitindo uma movimentação econômica local mais justa. Além de arquiteta, sou uma curiosa nata e conhecer universos diferentes é meu hobby favorito, portanto sinta-se mais que convidado para uma xícara de café e uma boa prosa que vou adorar.
						</Typography>

					</Grid>

					<Grid item xs={12} style={{ marginLeft: 60, marginRight: 60, marginTop: 60 }}>

						<Divider variant="middle" style={{ backgroundColor: 'rgb(255,248,41)' }} />

					</Grid>

					<Grid item xs={12} style={{ marginTop: 80 }}>

						<Typography style={{ textAlign: 'center', marginBottom: 30, fontSize: 40, fontWeight: 'bold', color: 'white', fontFamily:'Playfair Display' }}>
							Fique ligado no nosso <b style={{ color: 'rgb(255,248,41)' }}>Instagram!</b>
						</Typography>

						<InstaGallery />

					</Grid>

					<Grid item xs={12} style={{ marginTop: 30, marginBottom: 80 }}>

						<Typography style={{ textAlign: 'center', marginBottom: 20, marginLeft: 100, marginRight: 100, fontSize: 20, color: 'white',fontFamily:'Playfair Display' }}>
							Atualizamos nosso instagram diariamente com dicas de arquitetura, vídeos de montagem de projetos,
							notícias sobre arquitetura e tecnologia e portifólio dos projetos realizados
						</Typography>

						<Button style={{ color: 'rgb(255,248,41)', fontFamily:'Playfair Display' }} onClick={() => { window.open('https://www.instagram.com/revivarq') }} className={classes.button}>
							Siga nosso Instagram!
      					</Button>

					</Grid>

				</Grid>


			</div>
		)
	}
}

export default withStyles(styles)(HomePage) 