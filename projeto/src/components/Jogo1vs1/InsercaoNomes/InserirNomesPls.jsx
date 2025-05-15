import './InserirNomesPls.css'
import sairImage from '../../../assets/images/sair_b.png';
import React, { useState } from 'react';
import JogoPlvsPl from '../Jogo/jogo1vs1';

export default function IntroduzirPlayers({ voltarAoMenu }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [jogoIniciado, setjogoIniciado] = useState(false);
  const [erro, setErro] = useState('');

  const handleStart = () => {
    if (player1.trim() && player2.trim()) {
      if (player1.trim() === player2.trim()) {
        setErro("Os jogadores devem ter nomes diferentes.");
      } else {
        setErro('');
        setjogoIniciado(true);
      }
    } else {
      setErro('Por favor, preencha os dois nomes.');
    }
  };

  //para poder usar a tecla enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };
  

  if (jogoIniciado) {
    return (
      <JogoPlvsPl
        player1={player1}
        player2={player2}
        voltarAoMenu={voltarAoMenu}
        setPlayer1={setPlayer1}
        setPlayer2={setPlayer2}
      />
    );
  }

  return (
    <div className='nomes-jogadores'>
      <h2>Modo 1 vs 1</h2>
      <input
        type="text"
        maxLength={12}
        placeholder="Nome do Jogador 1"
        onChange={(e) => setPlayer1(e.target.value)}
        onKeyDown={handleKeyPress}
        autoFocus
      />
      <input
        type="text"
        maxLength={12}
        placeholder="Nome do Jogador 2"
        onChange={(e) => setPlayer2(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {erro && (
        <div className="mensagem-erro">
          {erro}
        </div>
      )}
      <div className='row'>
        <button onClick={handleStart}>Começar Jogo</button>
        <button onClick={voltarAoMenu}>
          <img src={sairImage} alt="Voltar ao menu" />
        </button>
      </div>
    </div>
  );
}
