'use strict'

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const basename = path.basename(__filename)
const config = require('../config/config')
const models = {}

const {
    db: { host, port }
} = config
const connectionString = `mongodb://${host}:${port}/`

// @ts-ignore
mongoose
    .connect(connectionString, config.mongoose)
    .then(
        () => {
            console.log('Connected to MongoDB...') // Processamento assíncrono, pode acontecer das coisas abaixo disso executarem antes deste log. Fica a dica.
        },
        (err) => {
            console.error(`Error: ${err}`)
        }
    )
    .catch((err) => {
        console.error(`Error Caught: ${err}`)
    })

mongoose.set('debug', config.settings.logging)
mongoose.set('useCreateIndex', config.settings.useCreateIndex)

const createAdminUser = (model) => {
    const user = new model({
        name: 'admin',
        lastName: 'master',
        email: 'admin@gmail.com',
        password:
            '16af46f7cec7f8769e8b7b17e94598d6e733692627fbcb5f7a213dfe9619e1ff', //123456
        isAdmin: true,
        salt:
            'e53a1bf917fe9032dcb179d80cebded6be7eb62d2191d9f974f6ed5606104a9f',
        whatsapp: '5188679538'
    })
    user.save()
}

const createUsers = (model) => {
    const user = new model({
        name: 'João',
        lastName: 'Silva',
        email: 'joao@gmail.com',
        password:
            'dcea7822b52064cc9de785b8ca79500d09a3ebf62efdda493b1592759b52e281', //123456
        salt:
            '33445e5d356759846c91da17c564032becd783707f427863dc5de4f7c495589d',
        _id: '5d905fce9a095d76e654ffdb',
        whatsapp: '5188888538'
    })

    const user1 = new model({
        name: 'Paula',
        lastName: 'Flores',
        email: 'paula@gmail.com',
        password:
            'def40564c5918d52e6ee4d879fbe9efad2d4fd28443c430813b950df7a74652a', //123456
        salt:
            'd930ef5f6d3f54f3fb9143a865b63fac153e7a34fa1c6c66ac664078b15a0a6a',
        _id: '5d90603bb24343774eb0cb16',
        whatsapp: '5188679544'
    })

    const user2 = new model({
        name: 'Pedro',
        lastName: 'Pedreira',
        email: 'pedro@gmail.com',
        password:
            '9bd166283888fbeafbc7e86e5776dd97f66048ec220e81c6ff0c038eaa658ca6',
        salt:
            'f086191e042679a54b1dfb1a5dbf1e367845ef391653d7752d3d25b08acefa28',
        _id: '5d90603bb24343774eb0cb17',
        whatsapp: '5188694832'
    })

    user.save()
    user1.save()
    user2.save()
}

//OBS: imagem de exemplo para as reformas de testes cadastradas. deixei comentada pois é pesado e atrapalha ficar carregando toda vez q iniciar o node.
//caso queiram carregar descomentem a linha abaixo e adicionem no array das photos de cada reforma abaixo antes de iniciar a API e gerar o banco.

//const reformImage = fs.readFileSync('./models/reforma_example.jpg', 'base64')

const createReformsData = (model) => {
    const reforms = new model({
        userId: '5d905fce9a095d76e654ffdb',
        _id: '5d92891f916da312a457a0f0',
        establishmentName: 'A&B Estética',
        establishmentType: 'Salão de Beleza',
        status: 'Orçamento Solicitado',
        author: 'João Silva',
        phone: '5199483954',
        area: 50,
        reformItens: {
            fachada: true,
            identidadeEComunicacao: false,
            paredesERevestimentos: false,
            forro: false,
            iluminacao: false,
            projetoImobiliario: false,
            paisagismo: false,
            projetoEletrico: false,
            projetoHidraulico: false,
            necessidadeDemolir: false,
            necessidadeConstruir: false,
            outros: 'outro tipo abce'
        },
        address: {
            cep: '90035060',
            street: 'Rua Dona Flores',
            number: 532,
            complement: 'Casa',
            neighborhood: 'Centro',
            city: 'Porto Alegre',
            uf: 'RS'
        },
        goal: 'Reformar o salão principal da casa.',
        restrictions: 'Nenhuma',
        budgetLimit: 5000,
        photos: []
    })

    const reforms1 = new model({
        userId: '5d90603bb24343774eb0cb16',
        _id: '5d92891f916da312a457a0f1',
        establishmentName: 'Cantina 321',
        establishmentType: 'Restaurante',
        status: 'Em Andamento',
        area: 40,
        author: 'Paula Flores',
        phone: '5184573823',
        reformItens: {
            fachada: false,
            identidadeEComunicacao: false,
            paredesERevestimentos: false,
            forro: true,
            iluminacao: false,
            projetoImobiliario: false,
            paisagismo: true,
            projetoEletrico: false,
            projetoHidraulico: false,
            necessidadeDemolir: false,
            necessidadeConstruir: false,
            outros: ''
        },
        address: {
            cep: '90025060',
            street: 'Rua Protásio Alves',
            number: 1239,
            complement: 'Casa',
            neighborhood: 'Rio Branco',
            city: 'Porto Alegre',
            uf: 'RS'
        },
        goal: 'Reformar o banheiro do restaurante.',
        restrictions: 'Nenhuma',
        budgetLimit: 4500,
        photos: []
    })

    const reforms2 = new model({
        userId: '5d90603bb24343774eb0cb16',
        _id: '5d92891f916da312a457a0f2',
        establishmentName: 'Fruteira do Silva',
        establishmentType: 'Fruteira',
        status: 'Aprovado',
        area: 30,
        author: 'Paula Flores',
        phone: '5195848695',
        reformItens: {
            fachada: false,
            identidadeEComunicacao: false,
            paredesERevestimentos: true,
            forro: false,
            iluminacao: false,
            projetoImobiliario: false,
            paisagismo: false,
            projetoEletrico: false,
            projetoHidraulico: true,
            necessidadeDemolir: false,
            necessidadeConstruir: false,
            outros: ''
        },
        address: {
            cep: '90035020',
            street: 'Rua Vasco da Gama',
            number: 9324,
            complement: 'Casa',
            neighborhood: 'Rio Branco',
            city: 'Porto Alegre',
            uf: 'RS'
        },
        goal: 'Reformar o balcão de entrada.',
        restrictions: 'Nenhuma',
        budgetLimit: 3500,
        photos: []
    })

    reforms.save()
    reforms1.save()
    reforms2.save()
}

const createHomeTexts = (model) => {
    const texts = new model({
        about:
            'Somos uma empresa que oferece serviços personalizados de arquitetura e design para transformar o seu negócio cabendo no seu bolso',
        found1:
            'Oi gente! Sou a Carol, uma das arquitetas inquietas da Revivarq! Me formei em Arquitetura e Urbanismo no ano de 2018, na PUCRS. Tenho experiência com projetos comerciais, administrativos e licenciamentos. Adoro ver as mudanças que a arquitetura pode trazer para as pessoas, pessoal e profissionalmente. Acredito que as mudanças são muito importantes pra que o futuro seja significativo. Além de arquiteta, estudo dança e sou uma grande apreciadora de arte. Por isso, adoro relacionar essas duas áreas. Uma boa arquitetura deve ser considerada uma bela obra de arte!',
        found2:
            'E aí, tudo bacana? Eu sou a Vanessa, arquiteta formada pela PUCRS em 2018 e acredito na desmistificação e democratização da arquitetura. Tenho uma trajetória focada no ramo de arquitetura comercial, especialmente trabalhando com grande redes varejistas no cenário nacional. Entretanto, acredito que olhar para o empreendedor de bairro e oferecer a ele uma oportunidade de planejamento e reconfiguração de seu espaço de trabalho propicia um benefício para além de seu negócio, impactando também a vitalidade urbana e permitindo uma movimentação econômica local mais justa. Além de arquiteta, sou uma curiosa nata e conhecer universos diferentes é meu hobby favorito, portanto sinta-se mais que convidado para uma xícara de café e uma boa prosa que vou adorar.',
        unique: true
    })
    texts.save()
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        )
    })
    .forEach((file) => {
        const fileData = require(`./${file}`)()
        models[fileData.name] = mongoose.model(fileData.name, fileData.schema)
        if (fileData.name === 'Users') {
            createAdminUser(models[fileData.name])
            createUsers(models[fileData.name])
        } else {
            if (fileData.name === 'Reforms') {
                createReformsData(models[fileData.name])
            } else {
                if (fileData.name === 'Texts') {
                    console.log('chamando')
                    createHomeTexts(models[fileData.name])
                }
            }
        }
    })

module.exports = models
