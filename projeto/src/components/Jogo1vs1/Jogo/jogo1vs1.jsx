import './jogo1vs1.css';
import sairImage from '../../../assets/images/sair.png';
import Tabela from '../Tabela/tabela';
import { useEffect, useRef, useState } from 'react';
import PopUpVencedor from '../popUpVencedor/popUpVencedor';
import Header from '../Header/Header';
import { temporizador } from '../../../constants/constants';
import IntroduzirPlayers  from '../InsercaoNomes/InserirNomesPls'

export default function JogoPlvsPl({ player1, player2, voltarAoMenu, setPlayer1, setPlayer2}) {
    const [winner, setWinner] = useState(0);
    const [turno, setTurno] = useState(1);
    const [tempoRestante, setTempoRestante] = useState(temporizador);
    const [jogadaBloqueada, setJogadaBloqueada] = useState(false);
    const intervalRef = useRef(null);
    const [mostrarIntroducao, setMostrarIntroducao] = useState(false); //(se verdade direciona para a introducao de nomes de players)
    

    const trocarTurno = () => {
        setTurno(turno === 1 ? 2 : 1);
        setTempoRestante(temporizador);
    };

    const reporJogo = () => {
        setWinner(0);
        setPlayer1('')
        setPlayer2('')
        setMostrarIntroducao(true)
    }

    const jogarNovamente = () => {
        setWinner(0)
    }

    useEffect(() => {
        if (winner !== 0) return;

        clearInterval(intervalRef.current);
        setTempoRestante(temporizador);

        intervalRef.current = setInterval(() => {
            setTempoRestante(prev => {
                if (prev <= 1) {
                    trocarTurno();
                    return temporizador;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [turno, winner]);

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
                    pontuacao1={0}
                    pontuacao2={0}
                    turno={turno}
                />
                <div className='ct-tabela-jogo'>
                    <Tabela
                        winner={winner}
                        setWinner={setWinner}
                        turno={turno}
                        setTurno={setTurno}
                        trocarTurno={trocarTurno}
                        jogadaBloqueada={jogadaBloqueada}
                        setJogadaBloqueada={setJogadaBloqueada}
                        setTempoRestante={setTempoRestante}
                        tempoRestante={tempoRestante}
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
                    />
                )}
            </div>
        </div>
    );
}
