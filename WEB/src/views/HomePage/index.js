import React from 'react'
import './styles.css'
//import InstaGallery from '../../components/InstaGallery/index.js'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
// Biblioteca de Componentes
import carol from '../../Assets/carol.png'
import vanessa from '../../Assets/vanessa.png'
import Divider from '@material-ui/core/Divider'
// Views
import Page from 'views/Page'
import HomeTexts from '../../components/Home'

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

                    <Grid container xs={12}>
                        <Grid
                            container
                            item
                            xs={12}
                            lg={6}
                            className={classes.centering}
                        >
                            <Typography
                                className={classes.text}
                                style={{ fontWeight: 'bold', fontSize: 35 }}
                            >
                                Quem somos?
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            item
                            xs={12}
                            lg={6}
                            className={classes.centering}
                        >
                            <Typography className={classes.text}>
                                <HomeTexts text={'about'} />
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className={classes.divider}>
                        <Divider
                            variant="middle"
                            style={{ backgroundColor: 'rgb(255,248,41)' }}
                        />
                    </Grid>

                    <Grid
                        container
                        item
                        xs={12}
                        style={{
                            justifyContent: 'space-around'
                        }}
                    >
                        <Grid
                            container
                            item
                            xs={12}
                            lg={6}
                            style={{ height: 'fit-content', marginTop: 50 }}
                        >
                            <Grid item xs={12}>
                                <img
                                    alt={'Avatar Carol'}
                                    src={carol}
                                    className={classes.avatar}
                                />
                            </Grid>
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
                                    <HomeTexts text={'found1'} />
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            item
                            xs={12}
                            lg={5}
                            style={{ marginTop: 50 }}
                        >
                            <Grid item xs={12}>
                                <img
                                    src={vanessa}
                                    alt={'Avatar Vanessa'}
                                    className={classes.avatar}
                                />
                            </Grid>
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
                                    <HomeTexts text={'found2'} />
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
        )
    }
}

export default withStyles(styles)(HomePage)
