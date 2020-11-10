import React from 'react'
import './styles.css'
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import { showNotification } from 'components/Notification'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Constants } from '../../../configs/constants'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel
} from '@material-ui/core'
import { editReform, postReform } from '../../../services/reforms'
import { postPhotos } from '../../../services/photos'

import NumberFormat from 'react-number-format'
import withStyles from '@material-ui/core/styles/withStyles'

class ReformForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            render: null,
            photos: [],
            establishmentName: '',
            establishmentType: '',
            goal: '',
            status: '',
            area: '',
            phone: '',
            restrictions: '',
            budgetLimit: '',
            outros: '',
            isLoading: false,
            file: [],
            imagePreviewUrl: [],
            imgPost: [],
            open: false,
            setOpen: false,
            errors: {},
            errorMessage: '',
            address: {
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                uf: ''
            },
            reformItens: {
                fachada: false,
                identidadeEComunicacao: false,
                paredesERevestimentos: false,
                paisagismo: false,
                forro: false,
                iluminacao: false,
                projetoImobiliario: false,
                projetoHidraulico: false,
                necessidadeDemolir: false,
                necessidadeConstruir: false,
                outros: ''
            },
            abreFotos: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.imgChange = this.imgChange.bind(this)
    }

    async registrarReforma(reform) {
        return await postReform(reform, false)
    }

    async submitFotos() {
        return await postPhotos(this.state.file)
    }

    async handleCreate() {
        const submitfoto = await this.submitFotos()

        this.state.photos = submitfoto.images

        const reform = {
            photos: this.state.photos,
            file: this.state.file,
            establishmentType: this.state.establishmentType,
            status: 'Orçamento Solicitado',
            restrictions: this.state.restrictions,
            area: this.state.area,
            phone: this.state.phone,
            budgetLimit: this.state.budgetLimit,
            goal: this.state.goal,
            userId: '',
            establishmentName: this.state.establishmentName,
            outros: this.state.outros,
            address: this.state.address,
            reformItens: this.state.reformItens
        }

        return await this.registrarReforma(reform)
    }

    async handleEdit() {
        const { reform } = this.props

        this.state.budgetLimit = this.state.budgetLimit
            .replace(/\./g, '')
            .replace(/,/, '.')
            .replace('R$', '')
        this.state.area = this.state.area.replace(/[^0-9]/g, '')
        this.state.address.cep = this.state.address.cep.replace(/-/g, '')
        this.state.phone = this.state.phone.replace(/_/, '')

        const reformUpdated = {
            ...reform,
            establishmentName: this.state.establishmentName,
            establishmentType: this.state.establishmentType,
            area: this.state.area,
            address: this.state.address,
            reformItens: this.state.reformItens,
            goal: this.state.goal,
            restrictions: this.state.restrictions,
            budgetLimit: this.state.budgetLimit,
            phone: this.state.phone
        }

        return await editReform(reformUpdated)
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const registerAttempt = this.props.reform
            ? await this.handleEdit()
            : await this.handleCreate()

        if (registerAttempt.statusCode !== Constants.successCode) {
            this.setState({
                errorMessage: registerAttempt.statusDesc
            })
            showNotification(registerAttempt.statusDesc, '', 'danger')
            return false
        } else {
            const { history } = this.props
            history.push('/AreaCliente')
            window.location.reload()
            return true
        }
    }

    async onSubmit(e) {
        e.preventDefault()
        this.setState({
            isLoading: true
        })
    }

    redirect = (path) => {
        const { history } = this.props
        history.push(path)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    imgChange = (e) => {
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onloadend = () => {
            const aux = this.state.file
            const aux2 = this.state.imagePreviewUrl
            const aux3 = this.state.imgPost

            const imgPre = { nome: file.name, foto: reader.result }
            aux.push(file)
            aux2.push(imgPre)
            aux3.push(reader.result)
            this.setState({
                file: aux,
                imagePreviewUrl: aux2,
                imgPost: aux3
            })
        }
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file)
        }

        //	console.log(this.state.file)
    }

    abreFotos() {
        const estado = this.state.abreFotos
        if (estado) {
            this.setState({
                abreFotos: false
            })
        } else {
            this.setState({
                abreFotos: true
            })
        }
    }

    deletarImg(foto) {
        for (let j = 0; j < this.state.file.length; j++) {
            if (this.state.file[j].name === foto.nome) {
                this.state.file.splice(j, 1)
                this.state.imagePreviewUrl.splice(j, 1)
                this.state.imgPost.splice(j, 1)
                const listfinal = this.state.imagePreviewUrl
                const filefinal = this.state.file
                const postfinal = this.state.imgPost

                this.setState({
                    file: filefinal,
                    imagePreviewUrl: listfinal,
                    imgPost: postfinal
                })
            }
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    componentDidMount() {
        const { reform } = this.props
        console.log(this.props)

        if (reform) {
            this.setState({
                establishmentName: reform.establishmentName,
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

    render() {
        const {
            establishmentName,
            establishmentType,
            area,
            budgetLimit,
            restrictions,
            errors,
            phone,
            reformItens,
            address,
            goal
        } = this.state

        return (
            <Grid
                container
                xs={12}
                justify="center"
                alignItems="center"
                style={{ paddingTop: 25 }}
            >
                <Grid
                    container
                    item
                    xs={10}
                    alignContent="center"
                    justify="center"
                    className={'container-root'}
                >
                    <Grid item xs={12}>
                        <Typography
                            style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                padding: 25
                            }}
                        >
                            {this.props.title}
                        </Typography>
                    </Grid>

                    <Grid container item xs={12}>
                        <Grid container item xs={4}>
                            <Grid item xs={12}>
                                <Typography
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        padding: 25
                                    }}
                                >
                                    Informações Gerais
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="input"
                                    name="establishmentName"
                                    label="Nome do Estabelecimento *"
                                    onChange={this.onChange}
                                    error={errors.establishmentName}
                                    value={establishmentName}
                                    autoComplete="establishmentName"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="input"
                                    name="establishmentType"
                                    label="Tipo do Estabelecimento *"
                                    onChange={this.onChange}
                                    error={errors.establishmentType}
                                    value={establishmentType}
                                    autoComplete="tipoEstabelecimento"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <NumberFormat
                                    customInput={TextField}
                                    className="input"
                                    suffix={' m²'}
                                    inputProps={{ min: '0', step: '1' }}
                                    name="area"
                                    label="Área em m² *"
                                    onChange={(e) =>
                                        this.setState({ area: e.target.value })
                                    }
                                    error={errors.area}
                                    value={area}
                                    autoComplete="area"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className="input"
                                    type="text"
                                    inputProps={{ min: '0', step: '1' }}
                                    name="goal"
                                    label="Objetivo *"
                                    onChange={this.onChange}
                                    error={errors.goal}
                                    value={goal}
                                    autoComplete="goal"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <NumberFormat
                                    customInput={TextField}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'R$'}
                                    className="input"
                                    inputProps={{ min: '0', step: '1' }}
                                    name="budgetLimit"
                                    label="Orçamento Disponível *"
                                    onChange={(e) =>
                                        this.setState({
                                            budgetLimit: e.target.value
                                        })
                                    }
                                    error={errors.budgetLimit}
                                    value={budgetLimit}
                                    autoComplete="budgetLimit"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="input"
                                    name="restrictions"
                                    label="Restrições"
                                    onChange={this.onChange}
                                    error={errors.restrictions}
                                    value={restrictions}
                                    autoComplete="restrictions"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <NumberFormat
                                    customInput={TextField}
                                    format="(##) #####-####"
                                    mask="_"
                                    className="input"
                                    name="phone"
                                    onChange={(e) => {
                                        this.setState({ phone: e.target.value })
                                        this.onChange(e)
                                    }}
                                    label="Celular *"
                                    error={errors.phone}
                                    value={phone}
                                    autoComplete="phone"
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={4}>
                            <Grid item xs={12}>
                                <Typography
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        padding: 25
                                    }}
                                >
                                    Informações de Endereço
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <NumberFormat
                                    customInput={TextField}
                                    format="#####-###"
                                    mask="_"
                                    className="input"
                                    name="cep"
                                    label="CEP"
                                    onChange={(e) =>
                                        this.setState({
                                            address: {
                                                ...address,
                                                cep: e.target.value
                                            }
                                        })
                                    }
                                    error={errors.cep}
                                    value={address.cep}
                                    autoComplete="cep"
                                    inputProps={{ min: 0, step: 1 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="input"
                                    name="street"
                                    label="Rua *"
                                    onChange={(e) =>
                                        this.setState({
                                            address: {
                                                ...address,
                                                street: e.target.value
                                            }
                                        })
                                    }
                                    error={errors.street}
                                    value={address.street}
                                    autoComplete="street"
                                    type="text"
                                    inputProps={{ maxLength: 100 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <NumberFormat
                                    customInput={TextField}
                                    className="input"
                                    name="numero"
                                    label="Numero *"
                                    onChange={(e) =>
                                        this.setState({
                                            address: {
                                                ...address,
                                                number: e.target.value
                                            }
                                        })
                                    }
                                    error={errors.number}
                                    value={address.number}
                                    autoComplete="numero"
                                    onInput={(e) => {
                                        e.target.value = Math.max(
                                            0,
                                            parseInt(e.target.value)
                                        )
                                            .toString()
                                            .slice(0, 8)
                                    }}
                                    inputProps={{ maxLength: 8 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="input"
                                    name="complement"
                                    label="Complemento"
                                    onChange={(e) =>
                                        this.setState({
                                            address: {
                                                ...address,
                                                complement: e.target.value
                                            }
                                        })
                                    }
                                    error={errors.complement}
                                    value={address.complement}
                                    autoComplete="complement"
                                    type="text"
                                    inputProps={{ maxLength: 20 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="input"
                                    name="neighborhood"
                                    label="Bairro *"
                                    onChange={(e) =>
                                        this.setState({
                                            address: {
                                                ...address,
                                                neighborhood: e.target.value
                                            }
                                        })
                                    }
                                    error={errors.neighborhood}
                                    value={address.neighborhood}
                                    autoComplete="neighborhood"
                                    type="text"
                                    inputProps={{ maxLength: 40 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="input"
                                    name="city"
                                    label="Cidade *"
                                    onChange={(e) =>
                                        this.setState({
                                            address: {
                                                ...address,
                                                city: e.target.value
                                            }
                                        })
                                    }
                                    error={errors.city}
                                    value={address.city}
                                    autoComplete="city"
                                    type="text"
                                    inputProps={{ maxLength: 40 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    className="input"
                                    name="uf"
                                    label="UF *"
                                    onChange={(e) =>
                                        this.setState({
                                            address: {
                                                ...address,
                                                uf: e.target.value.toUpperCase()
                                            }
                                        })
                                    }
                                    error={errors.uf}
                                    value={address.uf}
                                    autoComplete="uf"
                                    type="text"
                                    inputProps={{ maxLength: 2 }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item xs={4}>
                            <Grid item xs={12}>
                                <Typography
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        padding: 25
                                    }}
                                >
                                    Itens de Reforma
                                </Typography>
                            </Grid>

                            <FormControl style={{ width: '100%' }}>
                                <FormControlLabel
                                    checked={reformItens.fachada}
                                    label="Fachada"
                                    labelPlacement="left"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                fachada: e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />

                                <FormControlLabel
                                    checked={reformItens.identidadeEComunicacao}
                                    label="Identidade e Comunicação"
                                    labelPlacement="left"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                identidadeEComunicacao:
                                                    e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />

                                <FormControlLabel
                                    style={{ fontSize: 50 }}
                                    checked={reformItens.paredesERevestimentos}
                                    label="Paredes e Revestimentos"
                                    labelPlacement="center"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                paredesERevestimentos:
                                                    e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />

                                <FormControlLabel
                                    checked={reformItens.paisagismo}
                                    label="Paisagismo"
                                    labelPlacement="left"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                paisagismo: e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />
                                <FormControlLabel
                                    checked={reformItens.forro}
                                    label="Forro"
                                    labelPlacement="left"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                forro: e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />
                                <FormControlLabel
                                    checked={reformItens.iluminacao}
                                    label="Iluminação" //refatorando novamente
                                    labelPlacement="left"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                iluminacao: e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />
                                <FormControlLabel
                                    checked={reformItens.projetoImobiliario}
                                    label="Projeto Imobiliária"
                                    labelPlacement="left"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                projetoImobiliario:
                                                    e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />
                                <FormControlLabel
                                    checked={reformItens.projetoHidraulico}
                                    label="Projeto hidráulico"
                                    labelPlacement="left"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                projetoHidraulico:
                                                    e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />
                                <FormControlLabel
                                    checked={reformItens.necessidadeDemolir}
                                    label="Necessidade de Demolição"
                                    labelPlacement="left"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                necessidadeDemolir:
                                                    e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />
                                <FormControlLabel
                                    checked={reformItens.necessidadeConstruir}
                                    label="Necessidade de Construção"
                                    labelPlacement="left"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                necessidadeConstruir:
                                                    e.target.checked
                                            }
                                        })
                                    }
                                    control={<Checkbox color="yellow" />}
                                />
                                <TextField
                                    value={reformItens.outros}
                                    label="Outros"
                                    onChange={(e) =>
                                        this.setState({
                                            reformItens: {
                                                ...reformItens,
                                                outros: e.target.value
                                            }
                                        })
                                    }
                                />
                            </FormControl>
                        </Grid>

                        <Grid container item xs={12}>
                            {/*<Grid
                            container
                            item
                            spacing={3}
                            style={{ display: 'center' }}
                        >
                            {this.state.abreFotos ? (
                                <Grid item xs={12} style={{ marginRight: 120 }}>
                                    <Button
                                        variant="contained"
                                        onClick={(e) => this.abreFotos(e)}
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'rgb(21,38,32)',
                                            fontSize: 15,
                                            display: 'flex-center',
                                            marginTop: 20
                                        }}
                                    >
                                        Fechar
                                    </Button>
                                    <Typography
                                        style={{
                                            color: 'black',
                                            fontSize: 20,
                                            display: 'flex-center'
                                        }}
                                    >
                                        <input
                                            style={{
                                                display: 'flex-center',
                                                margin: 20
                                            }}
                                            required=""
                                            type="file"
                                            accept="image/!*"
                                            onChange={(e) => this.imgChange(e)}
                                        />
                                    </Typography>
                                </Grid>
                            ) : (
                                <Grid item xs={12} style={{ marginRight: 120 }}>
                                    <Button
                                        variant="contained"
                                        onClick={(e) => this.abreFotos(e)}
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'rgb(21,38,32)',
                                            fontSize: 15,
                                            margin: 20,
                                            display: 'flex-center'
                                        }}
                                    >
                                        Adicionar Fotos
                                    </Button>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                {this.state.imagePreviewUrl.map((foto) => {
                                    return (
                                        <div>
                                            <img
                                                src={foto.foto}
                                                style={{
                                                    width: 70,
                                                    height: 70,
                                                    display: 'flex-center',
                                                    margin: 20
                                                }}
                                                alt={'foto'}
                                            />
                                            <Button
                                                variant="contained"
                                                style={{
                                                    color: 'white',
                                                    backgroundColor:
                                                        'rgb(21,38,32)',
                                                    display: 'flex-center',
                                                    marginBottom: 80
                                                }}
                                                onClick={() =>
                                                    this.deletarImg(foto)
                                                }
                                            >
                                                Remover
                                            </Button>
                                        </div>
                                    )
                                })}
                            </Grid>
                        </Grid>*/}

                            <Grid item xs={12}>
                                <Button
                                    onClick={() => this.handleClickOpen()}
                                    variant="contained"
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'rgb(21,38,32)',
                                        fontSize: 25,
                                        margin: 20
                                    }}
                                >
                                    Salvar
                                </Button>
                            </Grid>

                            <Dialog
                                style={{ color: 'black' }}
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle>
                                    {'Você deseja finalizar seu orçamento?'}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Ao clicar em "Concordo", você irá
                                        concluir seu orçamento e ser
                                        redirecionado para a Área de Cliente.
                                    </DialogContentText>
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={this.handleClose}>
                                        Discordo
                                    </Button>
                                    <Button onClick={this.handleSubmit}>
                                        Concordo
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            /*<Grid
                container
                className="reforma-container"
                style={{ alignItems: 'center' }}
            >
                <Grid
                    item
                    xs={12}
                    direction="column"
                    style={{
                        textAlign: 'center',
                        marginLeft: -10,
                        marginBottom: 20
                    }}
                >
                    <h1>{this.props.title}</h1>
                </Grid>

                <Grid item xs={3}>
                    <div />
                </Grid>

                <Grid
                    item
                    xs={3}
                    direction="column"
                    style={{ display: 'flex-end' }}
                    className="reforma-form-inner-container"
                >
                    <div className="reforma-form-inputs-container-top">
                        <InputLabel
                            style={{ textAlign: 'center', fontSize: 16 }}
                            htmlFor="demo-controlled-open-select"
                        >
                            Informações Gerais
                        </InputLabel>

                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display',
                                margin: 0
                            }}
                        >
                            <TextField
                                className="input"
                                name="establishmentName"
                                label="Nome do Estabelecimento *"
                                onChange={this.onChange}
                                error={errors.establishmentName}
                                value={establishmentName}
                                autoComplete="establishmentName"
                            />
                        </Typography>
                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <TextField
                                className="input"
                                name="establishmentType"
                                label="Tipo do Estabelecimento *"
                                onChange={this.onChange}
                                error={errors.establishmentType}
                                value={establishmentType}
                                autoComplete="tipoEstabelecimento"
                            />
                        </Typography>

                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <NumberFormat
                                customInput={TextField}
                                className="input"
                                suffix={' m²'}
                                inputProps={{ min: '0', step: '1' }}
                                name="area"
                                label="Área em m² *"
                                onChange={(e) =>
                                    this.setState({ area: e.target.value })
                                }
                                error={errors.area}
                                value={area}
                                autoComplete="area"
                            />
                        </Typography>

                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <TextField
                                className="input"
                                type="text"
                                inputProps={{ min: '0', step: '1' }}
                                name="goal"
                                label="Objetivo *"
                                onChange={this.onChange}
                                error={errors.goal}
                                value={goal}
                                autoComplete="goal"
                            />
                        </Typography>

                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <NumberFormat
                                customInput={TextField}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'R$'}
                                className="input"
                                inputProps={{ min: '0', step: '1' }}
                                name="budgetLimit"
                                label="Orçamento Disponível *"
                                onChange={(e) =>
                                    this.setState({
                                        budgetLimit: e.target.value
                                    })
                                }
                                error={errors.budgetLimit}
                                value={budgetLimit}
                                autoComplete="budgetLimit"
                            />
                        </Typography>
                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <TextField
                                className="input"
                                name="restrictions"
                                label="Restrições"
                                onChange={this.onChange}
                                error={errors.restrictions}
                                value={restrictions}
                                autoComplete="restrictions"
                            />
                        </Typography>

                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <NumberFormat
                                customInput={TextField}
                                format="(##) #####-####"
                                mask="_"
                                className="input"
                                name="phone"
                                onChange={(e) => {
                                    this.setState({ phone: e.target.value })
                                    this.onChange(e)
                                }}
                                label="Celular *"
                                error={errors.phone}
                                value={phone}
                                autoComplete="phone"
                            />
                        </Typography>










                        <InputLabel
                            style={{
                                textAlign: 'center',
                                fontSize: 16,
                                marginBottom: 10,
                                marginTop: 50
                            }}
                            htmlFor="demo-controlled-open-select"
                        >
                        
                        
                            Informações de Endereço
                        </InputLabel>
                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <NumberFormat
                                customInput={TextField}
                                format="#####-###"
                                mask="_"
                                className="input"
                                name="cep"
                                label="CEP"
                                onChange={(e) =>
                                    this.setState({
                                        address: {
                                            ...address,
                                            cep: e.target.value
                                        }
                                    })
                                }
                                error={errors.cep}
                                value={address.cep}
                                autoComplete="cep"
                                inputProps={{ min: 0, step: 1 }}
                            />
                        </Typography>
                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <TextField
                                className="input"
                                name="street"
                                label="Rua *"
                                onChange={(e) =>
                                    this.setState({
                                        address: {
                                            ...address,
                                            street: e.target.value
                                        }
                                    })
                                }
                                error={errors.street}
                                value={address.street}
                                autoComplete="street"
                                type="text"
                                inputProps={{ maxLength: 100 }}
                            />
                        </Typography>
                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <NumberFormat
                                customInput={TextField}
                                className="input"
                                name="numero"
                                label="Numero *"
                                onChange={(e) =>
                                    this.setState({
                                        address: {
                                            ...address,
                                            number: e.target.value
                                        }
                                    })
                                }
                                error={errors.number}
                                value={address.number}
                                autoComplete="numero"
                                onInput={(e) => {
                                    e.target.value = Math.max(
                                        0,
                                        parseInt(e.target.value)
                                    )
                                        .toString()
                                        .slice(0, 8)
                                }}
                                inputProps={{ maxLength: 8 }}
                            />
                        </Typography>
                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <TextField
                                className="input"
                                name="complement"
                                label="Complemento"
                                onChange={(e) =>
                                    this.setState({
                                        address: {
                                            ...address,
                                            complement: e.target.value
                                        }
                                    })
                                }
                                error={errors.complement}
                                value={address.complement}
                                autoComplete="complement"
                                type="text"
                                inputProps={{ maxLength: 20 }}
                            />
                        </Typography>
                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <TextField
                                className="input"
                                name="neighborhood"
                                label="Bairro *"
                                onChange={(e) =>
                                    this.setState({
                                        address: {
                                            ...address,
                                            neighborhood: e.target.value
                                        }
                                    })
                                }
                                error={errors.neighborhood}
                                value={address.neighborhood}
                                autoComplete="neighborhood"
                                type="text"
                                inputProps={{ maxLength: 40 }}
                            />
                        </Typography>
                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <TextField
                                className="input"
                                name="city"
                                label="Cidade *"
                                onChange={(e) =>
                                    this.setState({
                                        address: {
                                            ...address,
                                            city: e.target.value
                                        }
                                    })
                                }
                                error={errors.city}
                                value={address.city}
                                autoComplete="city"
                                type="text"
                                inputProps={{ maxLength: 40 }}
                            />
                        </Typography>
                        <Typography
                            style={{
                                color: 'black',
                                fontFamily: 'Playfair Display'
                            }}
                        >
                            <TextField
                                className="input"
                                name="uf"
                                label="UF *"
                                onChange={(e) =>
                                    this.setState({
                                        address: {
                                            ...address,
                                            uf: e.target.value.toUpperCase()
                                        }
                                    })
                                }
                                error={errors.uf}
                                value={address.uf}
                                autoComplete="uf"
                                type="text"
                                inputProps={{ maxLength: 2 }}
                            />
                        </Typography>
                    </div>

                    <Grid container spacing={3} style={{ display: 'center' }}>
                        {this.state.abreFotos ? (
                            <Grid item xs={12} style={{ marginRight: 120 }}>
                                <Button
                                    variant="contained"
                                    onClick={(e) => this.abreFotos(e)}
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'rgb(21,38,32)',
                                        fontSize: 15,
                                        display: 'flex-center',
                                        marginTop: 20
                                    }}
                                >
                                    Fechar
                                </Button>
                                <Typography
                                    style={{
                                        color: 'black',
                                        fontSize: 20,
                                        display: 'flex-center'
                                    }}
                                >
                                    <input
                                        style={{
                                            display: 'flex-center',
                                            margin: 20
                                        }}
                                        required=""
                                        type="file"
                                        accept="image/!*"
                                        onChange={(e) => this.imgChange(e)}
                                    />
                                </Typography>
                            </Grid>
                        ) : (
                            <Grid item xs={12} style={{ marginRight: 120 }}>
                                <Button
                                    variant="contained"
                                    onClick={(e) => this.abreFotos(e)}
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'rgb(21,38,32)',
                                        fontSize: 15,
                                        margin: 20,
                                        display: 'flex-center'
                                    }}
                                >
                                    Adicionar Fotos
                                </Button>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            {this.state.imagePreviewUrl.map((foto) => {
                                return (
                                    <div>
                                        <img
                                            src={foto.foto}
                                            style={{
                                                width: 70,
                                                height: 70,
                                                display: 'flex-center',
                                                margin: 20
                                            }}
                                            alt={'foto'}
                                        />
                                        <Button
                                            variant="contained"
                                            style={{
                                                color: 'white',
                                                backgroundColor:
                                                    'rgb(21,38,32)',
                                                display: 'flex-center',
                                                marginBottom: 80
                                            }}
                                            onClick={() =>
                                                this.deletarImg(foto)
                                            }
                                        >
                                            Remover
                                        </Button>
                                    </div>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={3}
                    direction="column"
                    className="reforma-form-radios-container"
                >
                    <div>
                        <Grid item xs={12}>
                            <InputLabel
                                style={{ margin: 20 }}
                                htmlFor="demo-controlled-open-select"
                            >
                                Itens da Reforma
                            </InputLabel>
                        </Grid>
                        <FormControl
                            style={{ margin: 10 }}
                            component="fieldset"
                            className="input"
                        >
                            <FormControlLabel
                                checked={reformItens.fachada}
                                label="Fachada"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            fachada: e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <FormControlLabel
                                checked={reformItens.identidadeEComunicacao}
                                label="Identidade e Comunicação"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            identidadeEComunicacao:
                                                e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <FormControlLabel
                                checked={reformItens.paredesERevestimentos}
                                label="Paredes e Revestimentos"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            paredesERevestimentos:
                                                e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <FormControlLabel
                                checked={reformItens.paisagismo}
                                label="Paisagismo"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            paisagismo: e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <FormControlLabel
                                checked={reformItens.forro}
                                label="Forro"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            forro: e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <FormControlLabel
                                checked={reformItens.iluminacao}
                                label="Iluminação" //refatorando novamente
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            iluminacao: e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <FormControlLabel
                                checked={reformItens.projetoImobiliario}
                                label="Projeto Imobiliária"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            projetoImobiliario: e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <FormControlLabel
                                checked={reformItens.projetoHidraulico}
                                label="Projeto hidráulico"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            projetoHidraulico: e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <FormControlLabel
                                checked={reformItens.necessidadeDemolir}
                                label="Necessidade de Demolição"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            necessidadeDemolir: e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <FormControlLabel
                                checked={reformItens.necessidadeConstruir}
                                label="Necessidade de Construção"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            necessidadeConstruir:
                                                e.target.checked
                                        }
                                    })
                                }
                                control={<Checkbox color="yellow" />}
                            />
                            <TextField
                                value={reformItens.outros}
                                label="Outros"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            outros: e.target.value
                                        }
                                    })
                                }
                            />
                        </FormControl>
                    </div>

                    <Grid item xs={12}>
                        <Button
                            onClick={() => this.handleClickOpen()}
                            variant="contained"
                            style={{
                                color: 'white',
                                backgroundColor: 'rgb(21,38,32)',
                                fontSize: 25,
                                margin: 20
                            }}
                        >
                            Salvar
                        </Button>
                    </Grid>
                    <div>
                        <Dialog
                            style={{ color: 'black' }}
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle>
                                {'Você deseja finalizar seu orçamento?'}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Ao clicar em "Concordo", você irá concluir
                                    seu orçamento e ser redirecionado para a
                                    Área de Cliente.
                                </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={this.handleClose}>
                                    Discordo
                                </Button>
                                <Button onClick={this.handleSubmit}>
                                    Concordo
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Grid>
            </Grid>*/
        )
    }
}

export default withRouter(ReformForm)
