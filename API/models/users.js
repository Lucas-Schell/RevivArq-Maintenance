const mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = () => {
  const schema = new Schema(
    {
      name: { type: String, unique: false, required: true },
      lastName: { type: String, unique: false, required: true },
      whatsapp: { type: Number, required: true },
      cpf: { type: String, unique: false, required: false },
      cnpj: { type: String, unique: false, required: false },
      address: {
        type: {
          cep: { type: String, unique: false, required: false },
          street: { type: String, unique: false, required: true },
          number: { type: Number, unique: false, required: true },
          complement: { type: String, unique: false, required: true },
          neighborhood: { type: String, unique: false, required: true },
          city: { type: String, unique: false, required: true },
          uf: { type: String, unique: false, required: true },
        },
        unique: false,
        required: false,
      },
      civilStatus: { type: String, unique: false, required: false },
      email: { type: String, unique: true, required: true, dropDups: true },
      password: { type: String, unique: false, required: true, select: false }, // select: false indica que não irá vir nas queries de seleção deste tipo de DOC, para incluir usar +password, por exemplo: "Users.findOne({_id: id}).select('+password').exec(...)" ou qualquer variante deste comando
      salt: { type: String, unique: false, required: true, select: false },
      isAdmin: { type: Boolean, unique: false, required: true, default: false },
      passCode: { type: String, unique: true, required: false, select: false },
    },
    {
      timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
  );

  // O que acontece... o id no mongodb é posto como _id pois ele organiza os fields em ordem alfabetica.
  // Este virtual cria um campo fantasma 'id' que é mapeado com base nesse _id
  // Cria um field "fantasma" sempre que este schema for usado.
  schema.virtual("id").get(function () {
    // Manter o "mapeamento" de _id para id caso queiram usar os Fronts dos modelos. Mas recomendo que
    // levem o tempo de vocês para alterarem esses fronts para usar _id ao invés do id dos usuários.
    //  É mais elegante.
    return this._id.toHexString();
  });

  schema.set("toJSON", {
    virtuals: true, // ativa a aparição de virtuals
    transform: (doc, ret, options) => {
      // remove o id e o __v de queries realizadas
      // delete ret._id;
    },
    versionKey: false, // remove numero de versionamento do retorno de queries realizadas
  });

  // Crie funções de schema aqui

  return { name: "Users", schema: schema };
};
