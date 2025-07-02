import express from 'express';
import Jogo from '../models/Jogo.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const novoJogo = new Jogo(req.body);
    const jogoSalvo = await novoJogo.save();
    res.status(201).json(jogoSalvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const jogos = await Jogo.find();
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const jogo = await Jogo.findById(req.params.id);
    if (!jogo) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json(jogo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const jogoAtualizado = await Jogo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!jogoAtualizado) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json(jogoAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const jogoDeletado = await Jogo.findByIdAndDelete(req.params.id);
    if (!jogoDeletado) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json({ message: 'Jogo deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
