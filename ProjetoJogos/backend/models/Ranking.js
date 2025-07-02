import mongoose from 'mongoose';

const RankingSchema = new mongoose.Schema({
  jogoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jogo',
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  modo: {
    type: String,
    required: true
  },
  pontos: {
    type: Number,
    required: true
  },
  erros: {
    type: Number,
    required: true
  },
  tempo: {
    type: Number,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

const Ranking = mongoose.model('Ranking', RankingSchema);
export default Ranking
