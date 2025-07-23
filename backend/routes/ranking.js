const router = express.Router();

import express from 'express';


import Ranking from './../models/Ranking.js'
import Jogo from './../models/Jogo.js'
import Usuario from '../models/Usuario.js';

router.post('/', async (req, res) => {
  try {
    const { jogoId, nome, usuarioId, modo, pontos, erros, tempo } = req.body;

    if (!jogoId || !usuarioId || !nome || !modo || pontos == null || erros == null || tempo == null) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const ranking = new Ranking({ jogoId, nome, usuarioId, modo, pontos, erros, tempo });
    await ranking.save();

    res.status(201).json(ranking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const rankings = await Ranking.find()
      .populate('jogoId', 'nome')
      .populate('usuarioId', 'nome')
      .sort({ pontos: -1, tempo: 1 })
      .limit(50);
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
