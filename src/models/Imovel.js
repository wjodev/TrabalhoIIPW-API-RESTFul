//Esquema da tabela do Banco de Dados 

const mongoose = require('../db/conexao')
const { Schema } = mongoose

const Imovel = mongoose.model(
  'Imovel',
  new Schema({
    matricula: {
        type: String,
         required: true,
        unique: true 
    },
    cep: {
        type: Number,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    }
  }, {timestamps: true}),//UpdateAt, CreateAt
)

module.exports = Imovel