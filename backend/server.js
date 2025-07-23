import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import jogoRoutes from './routes/jogos.js';
import usuarioRoutes from './routes/usuarios.js';
import rankingRoutes from './routes/ranking.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado com sucesso'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/api/jogos', jogoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ranking', rankingRoutes);


app.get('/ping', (req, res) => res.send('Servidor está funcionando!'));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
