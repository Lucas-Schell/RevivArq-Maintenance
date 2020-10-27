import React from 'react'
import './styles.css'
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import NumberFormat from 'react-number-format'
import { Constants } from '../../../configs/constants'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    Typography
} from '@material-ui/core'
import { bool } from 'prop-types'
import { editReform } from '../../../services/reforms/index'
import { showNotification } from 'components/Notification'

class EditReformForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            establishmentName: '',
            establishmentType: '',
            area: '',
            phone: '',
            address: {
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                uf: ''
            }, //address é um objeto endereço com as infos dentro conforme o modelo
            reformItens: {
                fachada: bool,
                identidadeEComunicação: bool,
                paredesERevestimentos: bool,
                paisagismo: bool,
                forro: bool,
                iluminação: bool,
                projetoImobiliario: bool,
                projetoHidraulico: bool,
                necessidadeDemolir: bool,
                necessidadeConstruir: bool,
                outros: ''
            },
            goal: '',
            restrictions: '',
            budgetLimit: '',
            errors: {}
        }
    }

    /**
     * Componente recebe o objeto de reforma via prop e atualiza em tela os valores
     * assim que logo na sua primeira renderização, caso não renderiza os campos vazio.
     */
    componentDidMount() {
        const { reform } = this.props

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

    redirect = (path) => {
        const { history } = this.props
        history.push(path)
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        console.log('Testando Entrada')

        const { reform } = this.props
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

        const response = await editReform(reformUpdated)

        if (response.statusCode !== Constants.successCode) {
            showNotification(response.statusDesc, '', 'danger')
            return false
        } else {
            const { history } = this.props
            history.push('/AreaCliente')
            window.location.reload()
            return true
        }
    }

    render() {
        const {
            establishmentName,
            establishmentType,
            errors,
            status,
            area,
            address,
            reformItens,
            goal,
            restrictions,
            budgetLimit,
            phone
        } = this.state

        //ajustar os campos que ficam com a label em cima da informação
        return (
            <Grid
                direction="column"
                container
                spacing={3}
                className="reforma-container"
            >
                <Grid item xs={12} direction="column">
                    <h1>{this.props.title}</h1>
                    <h4>
                        Status: <i>{status}</i>
                    </h4>
                </Grid>

                <Grid direction="column" item xs={3}>
                    <div />
                </Grid>

                <Grid
                    item
                    xs={12}
                    style={{ alignItems: 'center' }}
                    direction="column"
                    className="reforma-form-inner-container"
                >
                    <Grid
                        item
                        xs={12}
                        className="reforma-form-inputs-container-top"
                    >
                        <InputLabel
                            style={{
                                textAlign: 'center',
                                fontSize: 16,
                                marginBottom: 10
                            }}
                            htmlFor="demo-controlled-open-select"
                        >
                            Informações Gerais
                        </InputLabel>

                        <TextField
                            style={{ marginBottom: 10 }}
                            className="input"
                            name="establishmentName"
                            label="Nome do Estabelecimento *"
                            onChange={(e) =>
                                this.setState({
                                    establishmentName: e.target.value
                                })
                            }
                            error={errors.establishmentName}
                            value={establishmentName}
                            autoComplete="establishmentName"
                            inputProps={{ maxLength: 60 }}
                        />

                        <TextField
                            className="input"
                            style={{ marginBottom: 10 }}
                            name="establishmentType"
                            label="Tipo do Estabelecimento *"
                            onChange={(e) =>
                                this.setState({
                                    establishmentType: e.target.value
                                })
                            }
                            error={errors.establishmentType}
                            value={establishmentType}
                            autoComplete="establishmentType"
                            inputProps={{ maxLength: 50 }}
                        />
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
                                inputProps={{ min: 0, step: 1 }}
                                name="area"
                                label="Área em m² *"
                                onChange={this.onChange}
                                error={errors.area}
                                value={area}
                                autoComplete="area"
                            />
                        </Typography>
                        <TextField
                            className="input"
                            style={{ marginBottom: 10 }}
                            name="goal"
                            label="Objetivo *" //Goal
                            onChange={(e) =>
                                this.setState({ goal: e.target.value })
                            }
                            error={errors.goal}
                            value={goal}
                            autoComplete="goal"
                            type="text"
                            inputProps={{ maxLength: 100 }}
                        />
                        <TextField
                            className="input"
                            style={{ marginBottom: 10 }}
                            name="restrictions"
                            label="Restrições"
                            onChange={(e) =>
                                this.setState({ restrictions: e.target.value })
                            }
                            error={errors.restrictions}
                            value={restrictions}
                            autoComplete="restrictions"
                            type="text"
                            inputProps={{ maxLength: 100 }}
                        />
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
                                onChange={this.onChange}
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
                            <NumberFormat
                                customInput={TextField}
                                className="input"
                                style={{ marginBottom: 10 }}
                                name="phone"
                                label="Celular *" //telefone
                                onChange={(e) =>
                                    this.setState({
                                        phone: '' + e.target.value
                                    })
                                }
                                format="(##) #####-####"
                                mask="_"
                                error={errors.phone}
                                value={phone}
                                autoComplete="phone"
                                type="text"
                                inputProps={{ maxLength: 20 }}
                            />
                        </Typography>
                        <InputLabel
                            style={{
                                textAlign: 'center',
                                fontSize: 16,
                                marginBottom: 10,
                                marginTop: 10
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

                        <TextField
                            className="input"
                            style={{ marginBottom: 10 }}
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
                        <Typography>
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
                        <TextField
                            className="input"
                            style={{ marginBottom: 10 }}
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
                        <TextField
                            className="input"
                            style={{ marginBottom: 10 }}
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
                        <TextField
                            className="input"
                            style={{ marginBottom: 10 }}
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
                        <TextField
                            className="input"
                            style={{ marginBottom: 10 }}
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
                <Grid item xs={12} direction="column">
                    <Grid
                        item
                        xs={12}
                        style={{ alignItems: 'center' }}
                        className="reforma-form-radios-container"
                    >
                        <InputLabel htmlFor="demo-controlled-open-select">
                            Itens da Reforma
                        </InputLabel>
                        <FormControl
                            style={{ margin: 20 }}
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
                                checked={reformItens.identidadeEComunicação}
                                label="Identidade e Comunicação"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            identidadeEComunicação:
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
                                checked={reformItens.iluminação}
                                label="Iluminação"
                                labelPlacement="left"
                                onChange={(e) =>
                                    this.setState({
                                        reformItens: {
                                            ...reformItens,
                                            iluminação: e.target.checked
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
                    </Grid>
                </Grid>
                <span className="reforma-error-message">
                    {this.state.errorMessage}
                </span>
                <Grid item xs={12} style={{ alignItems: 'center' }}>
                    <Button
                        className="submitBtn"
                        onClick={this.handleSubmit}
                        type="submit"
                    >
                        Atualizar
                    </Button>
                    <Button
                        className="submitBtn"
                        type="submit"
                        onClick={() => this.props.history.push('/AreaCliente')}
                    >
                        Voltar
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(EditReformForm)
