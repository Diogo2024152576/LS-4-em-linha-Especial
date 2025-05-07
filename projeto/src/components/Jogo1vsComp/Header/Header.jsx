// src/components/Header/Header.jsx
import { temporizador } from '../../../constants/constants';
import './Header.css';
import { useEffect, useState } from 'react';

export default function Header({
    player1,
    player2,
    tempoRestante,
    pontuacao1,
    pontuacao2,
    turno
}) {
    const [bordaCor, setBordaCor] = useState('green');
    const porcentagem = 100 -(tempoRestante / temporizador) * 100;

    useEffect(() => {
        if (tempoRestante > 5) {
            setBordaCor('green');
        } else if (tempoRestante > 2) {
            setBordaCor('#ffa500'); 
        } else {
            setBordaCor('#c74c4c');
        }
    }, [tempoRestante]);

    return (
        <div className='tabela-jogo'>
            <div className='row'>
                <div className="jogador">
                    <div className="timer-bola">
                        <div
                            className="tempo-borda"
                            style={{
                                '--percent': turno === 1 ? `${porcentagem}` : 0,
                                '--bordaCor': turno === 1 ? bordaCor : '#cccccc00'
                            }}                            
                        >
                            <div className="moeda-cor jogador1-cor"></div>
                        </div>
                    </div>
                    <div className="info-jogador">
                        <p className="nome">{player1}</p>
                        <p className="tempo">{turno === 1 ? tempoRestante !== 10 ? `00:0${tempoRestante}` : `00:${tempoRestante}` : '--:--'}</p>
                    </div>
                </div>

                <div className="centro">
                    <h2>4 Em Linha Especial</h2>
                    <p className="pontuacao">{pontuacao1} | {pontuacao2}</p>
                </div>

                <div className="jogador">
                    <div className="timer-bola">
                        <div
                            className="tempo-borda"
                            style={{
                                '--percent': turno === 2 ? `${porcentagem}` : 0,
                                '--bordaCor': turno === 2 ? bordaCor : '#cccccc00'
                            }}                            
                        >
                            <div className="moeda-cor jogador2-cor"></div>
                        </div>
                    </div>
                    <div className="info-jogador">
                        <p className="nome">{player2}</p>
                        <p className="tempo">{turno === 2 ? tempoRestante !== 10 ? `00:0${tempoRestante}` : `00:${tempoRestante}` : '--:--'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
