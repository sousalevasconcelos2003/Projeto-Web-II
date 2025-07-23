import express from "express";
import Usuario from "../models/Usuario.js";

const router = express.Router();

router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Preencha todos os campos." });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ erro: "E-mail já cadastrado." });
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
    return res.status(500).json({ erro: "Erro no servidor." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Preencha todos os campos." });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ erro: "E-mail não cadastrado." });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ erro: "Senha incorreta." });
    }

    return res.status(200).json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro no servidor." });
  }
});

export default router;
