import './jogo1vs1.css';
import sairImage from '../../../assets/images/sair_b.png';
import Tabela from '../Tabela/tabela';
import { useEffect, useRef, useState, useCallback } from 'react';
import PopUpVencedor from '../popUpVencedor/popUpVencedor';
import Header from '../Header/Header';
import { temporizador } from '../../../constants/constants';
import IntroduzirPlayers  from '../InsercaoNomes/InserirNomesPls'

export default function JogoPlvsPl({ player1, player2, voltarAoMenu, setPlayer1, setPlayer2 }) {
    const [winner, setWinner] = useState(0);
    const [turno, setTurno] = useState(Math.floor(Math.random() * 2) + 1);
    const [tempoRestante, setTempoRestante] = useState(temporizador);
    const [tempoCongelado, setTempoCongelado] = useState(false);
    const intervalRef = useRef(null);
    const [mostrarIntroducao, setMostrarIntroducao] = useState(false);
    const [pontos_pl1, setPontospl1] = useState(0);
    const [pontos_pl2, setPontospl2] = useState(0);
    const [limparTrigger, setLimparTrigger] = useState(0);
    const [bonusCoords, setBonusCoords] = useState([]);

    const trocarTurno = useCallback(() => {
        setTurno(turno === 1 ? 2 : 1);
        setTempoRestante(temporizador);
    }, [turno]);

    const reporJogo = () => {
        setWinner(0);
        setPlayer1('');
        setPlayer2('');
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
        else if (winner === 2) setPontospl2(prev => prev + 1);
    }, [winner]);

    if (mostrarIntroducao) {
        return <IntroduzirPlayers voltarAoMenu={voltarAoMenu} />;
    }

    return (
        <div className='jogo-main'>
            <div className='jogo'>
                <Header
                    player1={player1}
                    player2={player2}
                    tempoRestante={tempoRestante}
                    pontuacao1={pontos_pl1}
                    pontuacao2={pontos_pl2}
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
                    />
                </div>
            </div>
            <div className='sair' onClick={voltarAoMenu}>
                <button id="sair">
                    <img src={sairImage} alt="Voltar ao menu" />
                </button>
                <p>Sair do Jogo</p>
            </div>
            <div className={`popup-Vencedor ${winner !== 0 ? 'show' : ''}`}>
                {winner !== 0 && (
                    <PopUpVencedor
                        winner={winner}
                        player1={player1}
                        player2={player2}
                        reporJogo={reporJogo}
                        jogarNovamente={jogarNovamente}
                        voltarMenu={voltarAoMenu}
                    />
                )}
            </div>
        </div>
    );
}
