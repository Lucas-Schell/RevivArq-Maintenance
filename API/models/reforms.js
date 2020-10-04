const mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = () => {
    const schema = new Schema(
        {
            establishmentName: { type: String, unique: false, required: true },
            establishmentType: { type: String, unique: false, required: true },
            status: { type: String, unique: false, required: true },
            area: { type: String, unique: false, required: true },
            author: { type: String, unique: false, required: true },
            phone: { type: String, unique: false, required: true },
            reformItens: {
                type: {
                    fachada: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    identidadeEComunicação: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    paredesERevestimentos: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    forro: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    iluminacao: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    projetoImobiliario: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    paisagismo: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    projetoEletrico: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    projetoHidraulico: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    necessidadeDemolir: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    necessidadeConstruir: {
                        type: Boolean,
                        unique: false,
                        required: true,
                        default: false
                    },
                    outros: {
                        type: String,
                        unique: false,
                        required: true,
                        default: ''
                    }
                },
                unique: false,
                required: true
            },
            address: {
                type: {
                    cep: { type: String, unique: false, required: false },
                    street: { type: String, unique: false, required: true },
                    number: { type: Number, unique: false, required: true },
                    complement: {
                        type: String,
                        unique: false,
                        required: false
                    },
                    neighborhood: {
                        type: String,
                        unique: false,
                        required: true
                    },
                    city: { type: String, unique: false, required: true },
                    uf: { type: String, unique: false, required: true }
                },
                unique: false,
                required: false
            },
            goal: { type: String, unique: false, required: true },
            restrictions: { type: String, unique: false, required: false },
            budgetLimit: { type: String, unique: false, required: true },
            userId: { type: String, unique: false, required: true },
            photos: { type: Array, unique: false, required: false, default: [] } //select false para n vir na listagem se não a chamada fica muito pesada.
        },
        {
            timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
        }
    )

    // O que acontece... o id no mongodb é posto como _id pois ele organiza os fields em ordem alfabetica.
    // Este virtual cria um campo fantasma 'id' que é mapeado com base nesse _id
    // Cria um field "fantasma" sempre que este schema for usado.
    schema.virtual('id').get(function () {
        // Manter o "mapeamento" de _id para id caso queiram usar os Fronts dos modelos. Mas recomendo que
        // levem o tempo de vocês para alterarem esses fronts para usar _id ao invés do id dos usuários.
        //  É mais elegante.
        return this._id.toHexString()
    })

    schema.set('toJSON', {
        virtuals: true, // ativa a aparição de virtuals
        transform: (doc, ret, options) => {
            // remove o id e o __v de queries realizadas
            // delete ret._id;
        },
        versionKey: false // remove numero de versionamento do retorno de queries realizadas
    })

    // Crie funções de schema aqui

    return { name: 'Reforms', schema: schema }
}