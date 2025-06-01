import './main1vsComp.css';
import sairImage from '../../../assets/images/sair_b.png';
import Tabela from '../Tabela/tabela';
import { useEffect, useRef, useState, useCallback } from 'react';
import PopUpVencedor from '../popUpVencedor/popUpVencedor';
import Header from '../Header/Header';
import { temporizador } from '../../../constants/constants';
import IntroduzirPlayers from '../InsercaoNomes/InserirNomesPls';
import PopUpInfo from '../../Jogo1vs1/PopUpInfo/info';
import info_icon from '../../../assets/images/info.png';

export default function JogoPlvsPc({ player1, setPlayer1, voltarAoMenu }) {
  console.log("teste jogo" + player1);
  const [winner, setWinner] = useState(0);
  const [turno, setTurno] = useState(Math.floor(Math.random() * 2) + 1);
  const [tempoRestante, setTempoRestante] = useState(temporizador);
  const [tempoCongelado, setTempoCongelado] = useState(false);
  const intervalRef = useRef(null);
  const [mostrarIntroducao, setMostrarIntroducao] = useState(false);
  const [pontos_pl1, setPontospl1] = useState(0);
  const [pontos_pc, setPontospc] = useState(0);
  const [limparTrigger, setLimparTrigger] = useState(0);
  const [bonusCoords, setBonusCoords] = useState([]);
  const [cpuTrigger, setCpuTrigger] = useState(0);
  const [mostrarPopupVencedor, setMostrarPopupVencedor] = useState(false);
  const [mostrarInfo, setMostrarInfo] = useState(false)

  const trocarTurno = useCallback(() => {
    const novoTurno = turno === 1 ? 2 : 1;
    setTurno(novoTurno);
    setTempoRestante(temporizador);
    if (novoTurno === 2) {
      setCpuTrigger(prev => prev + 1);
    }
  }, [turno]);

  const reporJogo = () => {
    setWinner(0);
    setPlayer1('');
    setMostrarIntroducao(true);
  };

  const gerarBonus = () => {
    const coords = new Set();
    while (coords.size < 5) {
      const x = Math.floor(Math.random() * 6);
      const y = Math.floor(Math.random() * 7);
      coords.add(`${x},${y}`);
    }
    const coordsArray = Array.from(coords).map(coord => {
      const [x, y] = coord.split(',').map(Number);
      return { x, y };
    });
    setBonusCoords(coordsArray);
  };

  const jogarNovamente = () => {
    setWinner(0);
    setTurno(Math.floor(Math.random() * 2) + 1);
    setLimparTrigger(prev => prev + 1);
    setTimeout(() => gerarBonus(), 0);
  };

  useEffect(() => {
    if (winner !== 0) return;

    clearInterval(intervalRef.current);
    setTempoRestante(temporizador);

    intervalRef.current = setInterval(() => {
      setTempoRestante(prev => {
        if (tempoCongelado) return prev;
        if (prev <= 1) {
          trocarTurno();
          return temporizador;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [turno, winner, trocarTurno, tempoCongelado]);

  useEffect(() => {
    gerarBonus();
  }, []);

  useEffect(() => {
    if (winner === 1) setPontospl1(prev => prev + 1);
    else if (winner === 2) setPontospc(prev => prev + 1);
  }, [winner]);

  useEffect(() => {
    if (winner !== 0) {
      const timeout = setTimeout(() => setMostrarPopupVencedor(true), 1500);
      return () => clearTimeout(timeout);
    } else {
      setMostrarPopupVencedor(false);
    }
  }, [winner]);

  if (mostrarIntroducao) {
    return <IntroduzirPlayers voltarAoMenu={voltarAoMenu} />;
  }

  return (
    <div className='jogo-main'>
      <div className='jogo'>
        <Header
          player1={player1}
          player2={'CPU'}
          tempoRestante={tempoRestante}
          pontuacao1={pontos_pl1}
          pontuacao2={pontos_pc}
          turno={turno}
        />
        <div className='ct-tabela-jogo'>
          <Tabela
            winner={winner}
            setWinner={setWinner}
            turno={turno}
            setTurno={setTurno}
            trocarTurno={trocarTurno}
            setTempoRestante={setTempoRestante}
            tempoRestante={tempoRestante}
            limparTabelaTrigger={limparTrigger}
            bonusCoords={bonusCoords}
            setTempoCongelado={setTempoCongelado}
            cpuTrigger={cpuTrigger}
          />
        </div>
      </div>
      <div className='sair-info'>
        <div className='info' onClick={() => setMostrarInfo(true)}>
          <button id="info">
            <img src={info_icon} alt="Informações"/>
          </button>
          <p>Instruções</p>
        </div>
        <div className='info' onClick={voltarAoMenu}>
          <button id="sair">
            <img src={sairImage} alt="Voltar ao menu" />
          </button>
          <p>Sair do Jogo</p>
        </div>
        <div className={`popup-Vencedor ${winner !== 0 ? 'show' : ''}`}>
          {winner !== 0 && mostrarPopupVencedor && (
            <PopUpVencedor
              winner={winner}
              player1={player1}
              player2={'CPU'}
              reporJogo={reporJogo}
              jogarNovamente={jogarNovamente}
              voltarMenu={voltarAoMenu}
            />
          )}
        </div>
        {mostrarInfo && <PopUpInfo fechar={() => setMostrarInfo(false)} />}
      </div>   
    </div>
  );
}
