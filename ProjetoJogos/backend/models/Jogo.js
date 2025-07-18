import mongoose from 'mongoose';

const perguntaSchema = new mongoose.Schema({
  pergunta: String,
  correta: String,
  opcoes: [String]
});

const jogoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  tipo: { type: String, required: true },
  perguntas: [perguntaSchema],
  criadoEm: { type: Date, default: Date.now }
});

const Jogo = mongoose.model('Jogo', jogoSchema);
export default Jogo;
