import express from "express";
import Usuario from "../models/Usuario.js";

const router = express.Router();

router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).send("Preencha todos os campos.");
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).send("E-mail já cadastrado.");
    }

    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    return res.status(201).json({
      _id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro no servidor.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).send("Preencha todos os campos.");
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).send("Usuário não encontrado.");
    }

    if (usuario.senha !== senha) {
      return res.status(401).send("Senha incorreta.");
    }

    return res.status(200).json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro no servidor.");
  }
});

export default router;
