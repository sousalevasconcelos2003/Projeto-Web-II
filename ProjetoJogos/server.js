const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/projetojogos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado com sucesso!');
}).catch(err => {
  console.error('Erro ao conectar MongoDB:', err);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jogoRoutes = require('./routes/jogos');
const usuarioRoutes = require('./routes/usuarios');

app.use('/api/jogos', jogoRoutes); 
app.use('/api/usuarios', usuarioRoutes);

app.get('/ping', (req, res) => {
  res.send('Servidor está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



