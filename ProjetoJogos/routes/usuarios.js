const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).send('Preencha todos os campos.');
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).send('E-mail já cadastrado.');
    }

    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    return res.status(201).send('Usuário cadastrado com sucesso!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro no servidor.');
  }
});

module.exports = router;
