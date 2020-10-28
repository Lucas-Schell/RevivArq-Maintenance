import React from 'react'
import './styles.css'
import InstaGallery from '../../components/InstaGallery/index.js'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import image from '../../Assets/backgroundimg5.png'
import Typography from '@material-ui/core/Typography'
// Biblioteca de Componentes
import carol from '../../Assets/carol.png'
import vanessa from '../../Assets/vanessa.png'
import Divider from '@material-ui/core/Divider'
// Views
import Page from 'views/Page'

import { Button } from '@material-ui/core'

// Serviços

const styles = () => ({
    containerRoot: {
        justifyContent: 'center',
        minHeight: '91vh'
    },
    imageContainer: {
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },

    secondContainer: {
        padding: '0px 50px 0px 50px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },

    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontFamily: 'Roboto',
        fontSize: 70,
        color: '#FFFFFF'
    },

    text: {
        fontFamily: 'Roboto',
        fontSize: 30,
        color: '#FFFFFF'
    },

    textMin: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#FFFFFF'
    },
    span: {
        color: '#FFF829'
    },

    avatar: {
        height: 150,
        width: 150
    },
    divider: {
        padding: '50px 0px 50px 0px'
    }
})

class HomePage extends Page {
    // Uma das varias maneiras de proteger uma rota é criar uma Rota protegida e usa-la com herança. Ver ProtectedPage para entender a lógica

    constructor(props) {
        super(props)
        this.state = {
            userList: []
        }
    }

    authenticated = () => {
        return this.unauthenticated()
    }

    unauthenticated = () => {
        const { classes } = this.props
        return (
            <Grid container xs={12} className={classes.containerRoot}>
                <Grid container item xs={12} className={classes.imageContainer}>
                    <Grid
                        item
                        xs={12}
                        className="img"
                        justify="center"
                        style={{
                            height: 700,
                            //alignItems: 'center',
                            objectFit: 'nonen'
                        }}
                    >
                        <Grid
                            container
                            xs={12}
                            item
                            style={{
                                alignItems: 'center',
                                height: '100%'
                            }}
                        >
                            <Grid item xs={12}>
                                <Typography className={classes.titleText}>
                                    Renovando seu Negócio
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container className={classes.secondContainer}>
                    <Grid item xs={12} className={classes.divider}>
                        <Divider
                            variant="middle"
                            style={{ backgroundColor: 'rgb(255,248,41)' }}
                        />
                    </Grid>

                    <Grid container className={classes.image} xs={12}>
                        <Grid
                            container
                            item
                            xs={6}
                            className={classes.centering}
                        >
                            <Typography className={classes.text}>
                                Quem somos?
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            item
                            xs={6}
                            className={classes.centering}
                        >
                            <Typography className={classes.text}>
                                Somos uma empresa que oferece{' '}
                                <span className={classes.span}>
                                    serviços personalizados
                                </span>{' '}
                                de arquitetura e design para transformar o seu
                                negócio{' '}
                                <span className={classes.span}>
                                    cabendo no seu bolso
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className={classes.divider}>
                        <Divider
                            variant="middle"
                            style={{ backgroundColor: 'rgb(255,248,41)' }}
                        />
                    </Grid>

                    <Grid container item xs={12}>
                        <Grid item xs={3}>
                            <img src={carol} className={classes.avatar} />
                        </Grid>
                        <Grid
                            container
                            item
                            xs={3}
                            style={{ height: 'fit-content' }}
                        >
                            <Grid item xs={12}>
                                <Typography
                                    className={classes.textMin}
                                    style={{
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Carolina Santos
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    className={classes.textMin}
                                    style={{
                                        textAlign: 'left',
                                        color: '#FFF829'
                                    }}
                                >
                                    Fundadora
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    className={classes.textMin}
                                    style={{
                                        textAlign: 'justify'
                                    }}
                                >
                                    Oi gente! Sou a Carol, uma das arquitetas
                                    inquietas da Revivarq! Me formei em
                                    Arquitetura e Urbanismo no ano de 2018, na
                                    PUCRS. Tenho experiência com projetos
                                    comerciais, administrativos e
                                    licenciamentos. Adoro ver as mudanças que a
                                    arquitetura pode trazer para as pessoas,
                                    pessoal e profissionalmente. Acredito que as
                                    mudanças são muito importantes pra que o
                                    futuro seja significativo. Além de
                                    arquiteta, estudo dança e sou uma grande
                                    apreciadora de arte. Por isso, adoro
                                    relacionar essas duas áreas. Uma boa
                                    arquitetura deve ser considerada uma bela
                                    obra de arte!
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={vanessa} className={classes.avatar} />
                        </Grid>
                        <Grid container item xs={3}>
                            <Grid item xs={12}>
                                <Typography
                                    className={classes.textMin}
                                    style={{
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Vanessa
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    className={classes.textMin}
                                    style={{
                                        textAlign: 'left',
                                        color: '#FFF829'
                                    }}
                                >
                                    Fundadora
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    className={classes.textMin}
                                    style={{
                                        textAlign: 'justify'
                                    }}
                                >
                                    E aí, tudo bacana? Eu sou a Vanessa,
                                    arquiteta formada pela PUCRS em 2018 e
                                    acredito na desmistificação e democratização
                                    da arquitetura. Tenho uma trajetória focada
                                    no ramo de arquitetura comercial,
                                    especialmente trabalhando com grande redes
                                    varejistas no cenário nacional. Entretanto,
                                    acredito que olhar para o empreendedor de
                                    bairro e oferecer a ele uma oportunidade de
                                    planejamento e reconfiguração de seu espaço
                                    de trabalho propicia um benefício para além
                                    de seu negócio, impactando também a
                                    vitalidade urbana e permitindo uma
                                    movimentação econômica local mais justa.
                                    Além de arquiteta, sou uma curiosa nata e
                                    conhecer universos diferentes é meu hobby
                                    favorito, portanto sinta-se mais que
                                    convidado para uma xícara de café e uma boa
                                    prosa que vou adorar.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className={classes.divider}>
                        <Divider
                            variant="middle"
                            style={{ backgroundColor: 'rgb(255,248,41)' }}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ paddingBottom: 20 }}>
                        <Typography
                            style={{
                                fontSize: 30,
                                fontFamily: 'Roboto',
                                color: '#FFFFFF'
                            }}
                        >
                            Fique ligado no nosso{' '}
                            <span className={classes.span}>Instagram!</span>
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{ paddingBottom: 20 }}>
                        <Typography className={classes.textMin}>
                            Atualizamos nosso instagram diariamente com dicas de
                            arquitetura, vídeos de montagem de projetos,
                            notícias sobre arquitetura e tecnologia e portifólio
                            dos projetos realizados
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{ paddingBottom: 20 }}>
                        <Typography className={classes.textMin}>
                            <span className={classes.span}>
                                Siga nosso instagram!
                            </span>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            /*<div>
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        className="img"
                        justify="center"
                        style={{
                            height: 700,
                            alignItems: 'center',
                            objectFit: 'nonen'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '70vh'
                            }}
                        >
                            <Typography
                                variant="overline"
                                className="txtIni"
                                style={{
                                    fontSize: 60,
                                    color: 'white'
                                }}
                                gutterBottom
                            >
                                Renovando seu Negócio
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography
                            style={{
                                textAlign: 'right',
                                marginTop: 80,
                                marginRight: 30,
                                fontSize: 60,
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            QUEM
                            <br />
                            SOMOS
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        style={{
                            textAlign: 'left',
                            justifyContent: 'left',
                            marginTop: 83,
                            fontSize: 20
                        }}
                    >
                        <Typography
                            variant="overline"
                            display="block"
                            style={{
                                textAlign: 'left',
                                marginLeft: 30,
                                marginRight: 260,
                                marginTop: 15,
                                fontSize: 20,
                                color: 'rgb(255,255,255)',
                                fontFamily: 'Playfair Display'
                            }}
                            gutterBottom
                        >
                            Somos uma empresa que oferece{' '}
                            <b style={{ color: 'rgb(255,248,41)' }}>
                                serviços personalizados
                            </b>{' '}
                            de arquitetura e design para transformar o seu
                            negócio{' '}
                            <b style={{ color: 'rgb(255,248,41)' }}>
                                cabendo no seu bolso
                            </b>
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        style={{
                            marginLeft: 60,
                            marginRight: 60,
                            marginTop: 60
                        }}
                    >
                        <Divider
                            variant="middle"
                            style={{ backgroundColor: 'rgb(255,248,41)' }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <img
                            style={{ marginTop: 80, height: 160, width: 160 }}
                            src={carol}
                            className="carolAvatar"
                            alt="carol"
                        />
                    </Grid>

                    <Grid item sm={3} xs={12} style={{ marginLeft: -50 }}>
                        <Typography
                            variant="overline"
                            display="block"
                            style={{
                                textAlign: 'left',
                                marginTop: 100,
                                fontSize: 20,
                                color: 'rgb(255,255,255)',
                                fontWeight: 'bold',
                                fontFamily: 'Playfair Display'
                            }}
                            gutterBottom
                        >
                            Carolina Santos
                        </Typography>

                        <Typography
                            variant="overline"
                            display="block"
                            style={{
                                textAlign: 'left',
                                fontSize: 20,
                                color: 'rgb(255,248,41)',
                                fontWeight: 'bold',
                                fontFamily: 'Playfair Display'
                            }}
                            gutterBottom
                        >
                            Fundadora
                        </Typography>

                        <Typography
                            variant="overline"
                            display="block"
                            style={{
                                textAlign: 'left',
                                marginTop: 15,
                                fontSize: 20,
                                color: 'rgb(255,255,255)',
                                letterSpacing: 0.5,
                                fontFamily: 'Playfair Display'
                            }}
                            gutterBottom
                        >
                            Oi gente! Sou a Carol, uma das arquitetas inquietas
                            da Revivarq! Me formei em Arquitetura e Urbanismo no
                            ano de 2018, na PUCRS. Tenho experiência com
                            projetos comerciais, administrativos e
                            licenciamentos. Adoro ver as mudanças que a
                            arquitetura pode trazer para as pessoas, pessoal e
                            profissionalmente. Acredito que as mudanças são
                            muito importantes pra que o futuro seja
                            significativo. Além de arquiteta, estudo dança e sou
                            uma grande apreciadora de arte. Por isso, adoro
                            relacionar essas duas áreas. Uma boa arquitetura
                            deve ser considerada uma bela obra de arte!
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <img
                            style={{ marginTop: 80, height: 160, width: 160 }}
                            src={vanessa}
                            className="vanessaAvatar"
                            alt="vanessa"
                        />
                    </Grid>

                    <Grid item xs={12} sm={3} style={{ marginLeft: -50 }}>
                        <Typography
                            variant="overline"
                            display="block"
                            style={{
                                textAlign: 'left',
                                marginTop: 100,
                                fontSize: 20,
                                color: 'rgb(255,255,255)',
                                fontWeight: 'bold',
                                fontFamily: 'Playfair Display'
                            }}
                            gutterBottom
                        >
                            Vanessa Moreira
                        </Typography>

                        <Typography
                            variant="overline"
                            display="block"
                            style={{
                                textAlign: 'left',
                                fontSize: 20,
                                color: 'rgb(255,248,41)',
                                fontWeight: 'bold',
                                fontFamily: 'Playfair Display'
                            }}
                            gutterBottom
                        >
                            Fundadora
                        </Typography>

                        <Typography
                            variant="overline"
                            display="block"
                            style={{
                                textAlign: 'left',
                                marginTop: 15,
                                fontSize: 20,
                                color: 'rgb(255,255,255)',
                                letterSpacing: 0.5,
                                fontFamily: 'Playfair Display'
                            }}
                            gutterBottom
                        >
                            E aí, tudo bacana? Eu sou a Vanessa, arquiteta
                            formada pela PUCRS em 2018 e acredito na
                            desmistificação e democratização da arquitetura.
                            Tenho uma trajetória focada no ramo de arquitetura
                            comercial, especialmente trabalhando com grande
                            redes varejistas no cenário nacional. Entretanto,
                            acredito que olhar para o empreendedor de bairro e
                            oferecer a ele uma oportunidade de planejamento e
                            reconfiguração de seu espaço de trabalho propicia um
                            benefício para além de seu negócio, impactando
                            também a vitalidade urbana e permitindo uma
                            movimentação econômica local mais justa. Além de
                            arquiteta, sou uma curiosa nata e conhecer universos
                            diferentes é meu hobby favorito, portanto sinta-se
                            mais que convidado para uma xícara de café e uma boa
                            prosa que vou adorar.
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        style={{
                            marginLeft: 60,
                            marginRight: 60,
                            marginTop: 60
                        }}
                    >
                        <Divider
                            variant="middle"
                            style={{ backgroundColor: 'rgb(255,248,41)' }}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: 80 }}>
                        <Typography
                            style={{
                                textAlign: 'center',
                                marginBottom: 30,
                                fontSize: 40,
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            Fique ligado no nosso{' '}
                            <b style={{ color: 'rgb(255,248,41)' }}>
                                Instagram!
                            </b>
                        </Typography>

                        <InstaGallery />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        style={{ marginTop: 30, marginBottom: 80 }}
                    >
                        <Typography
                            style={{
                                textAlign: 'center',
                                marginBottom: 20,
                                marginLeft: 100,
                                marginRight: 100,
                                fontSize: 20,
                                color: 'white',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            Atualizamos nosso instagram diariamente com dicas de
                            arquitetura, vídeos de montagem de projetos,
                            notícias sobre arquitetura e tecnologia e portifólio
                            dos projetos realizados
                        </Typography>

                        <Button
                            style={{
                                color: 'rgb(255,248,41)',
                                fontFamily: 'Playfair Display'
                            }}
                            onClick={() => {
                                window.open(
                                    'https://www.instagram.com/revivarq'
                                )
                            }}
                            className={classes.button}
                        >
                            Siga nosso Instagram!
                        </Button>
                    </Grid>
                </Grid>
            </div>*/
        )
    }
}

export default withStyles(styles)(HomePage)
