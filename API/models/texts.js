const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = () => {
    const schema = new Schema(
        {
            about: { type: String, unique: false, required: true },
            found1: { type: String, unique: false, required: true },
            found2: { type: String, unique: false, required: true },
            unique: { type: Boolean, unique: true, required: true }
        },
        {
            timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
        },
        { capped: { size: 100000, max: 1, autoIndexId: true } }
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

    return { name: 'Texts', schema: schema }
}
