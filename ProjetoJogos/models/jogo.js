const mongoose = require('mongoose');

const jogoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Jogo', jogoSchema);
