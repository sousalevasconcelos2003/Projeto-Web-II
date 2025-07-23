// src/components/NomeUsuario.jsx
import { useEffect, useState } from 'react';
import styles from './NomeUsuario.module.css';

function NomeUsuario() {
  const [nome, setNome] = useState('');

  useEffect(() => {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuario && usuario.nome) {
      setNome(usuario.nome);
    }
  }, []);

  if (!nome) return null;

  return (
    <div className={styles.topo}>
      <span>👤 {nome}</span>
    </div>
  );
}

export default NomeUsuario;
