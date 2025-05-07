import './InserirNomesPls.css';
import sairImage from '../../../assets/images/sair_b.png';
import React, { useState } from 'react';
import JogoPlvsPc from '../Jogo/main1vsComp';  // Certifica-te que o caminho está correto!

export default function IntroduzirPlayerVsPc({ voltarAoMenu }) {
  const [player, setPlayer] = useState('');
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [erro, setErro] = useState('');

  const handleStart = () => {
    if (player.trim()) {
      setErro('');
      setJogoIniciado(true);
    } else {
      setErro('Por favor, insira o nome do jogador.');
    }
  };

  if (jogoIniciado) {
    return (
      <JogoPlvsPc
        player={player}
        voltarAoMenu={voltarAoMenu}
      />
    );
  }

  return (
    <div className='nomes-jogadores'>
      <h2>Modo Jogador vs Computador</h2>
      <input
        type="text"
        maxLength={12}
        placeholder="Nome do Jogador"
        onChange={(e) => setPlayer(e.target.value)}
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
