import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    minlength: [2, 'Nome muito curto'],
    match: [/^[A-Za-zÀ-ÿ\s]+$/, 'Nome inválido. Use apenas letras e espaços.']
  },
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'E-mail inválido']
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória']
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
