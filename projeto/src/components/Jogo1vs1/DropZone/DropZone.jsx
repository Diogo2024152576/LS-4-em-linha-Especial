import { colunas, linhas, tamanho, temporizador } from '../../../constants/constants';
import './DropZone.css';
import { useEffect, useState } from 'react';
import Moeda from '../Moeda/Moeda';
import { encontrarVencedor } from '../Vencedor/encontrarVencedor';

// SVG da estrela
const StarSVG = () => (
    <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 25, top: 25, zIndex: 200}}>
        <polygon points="20,2 25,15 39,15 28,24 32,38 20,30 8,38 12,24 1,15 15,15" fill="#1e1e2f" stroke="#1e1e2f" strokeWidth="2"/>
    </svg>
);

export default function DropZone({
    hoveredColumn,
    winner,
    setWinner,
    posicoesVencedoras = [],
    setPosicoesVencedoras,
    turno,
    setTurno,
    trocarTurno,
    setTempoRestante,
    limparTabelaTrigger,
    bonusCoords = [], 
    setTempoCongelado,
}) {
    const [dropped, setDropped] = useState([]);

    useEffect(() => {
        const resultado = encontrarVencedor(dropped, linhas, colunas);
        setWinner(resultado.vencedor);
        if (setPosicoesVencedoras) setPosicoesVencedoras(resultado.posicoesVencedoras);
    }, [dropped, setWinner, setPosicoesVencedoras]);

    useEffect(() => {
        setDropped([]);
    }, [limparTabelaTrigger]);

    const isBonus = (x, y) => {
        return bonusCoords.some(coord => coord.x === x && coord.y === y);
    };

    // Função para saber se a moeda está nas posições vencedoras
    const isVencedora = (x, y) => {
        return posicoesVencedoras.some(pos => pos.x === x && pos.y === y);
    };

    return (
        <div className='drop-zone'>
            {/* Grelha com bonus */}
            {Array.from({ length: linhas }).map((_, x) =>
                Array.from({ length: colunas }).map((_, y) => {
                    const bonusClass = isBonus(x, y) ? 'bonus-cell' : '';
                    return (
                        <div
                            key={`cell-${x}-${y}`}
                            className={`celula ${bonusClass}`}
                            style={{ left: `${y * tamanho}px`, top: `${x * tamanho + 140}px` }}
                        />
                    );
                })
            )}
            {dropped.map((m, i) =>
                <div
                    key={`moeda-${i}`}
                    className={`p${m.jogador}`}
                    style={{ transform: `translate(${m.y * tamanho}px, ${m.x * tamanho + 140}px)`, position: 'absolute' }}
                >
                    {isVencedora(m.x, m.y) && <StarSVG />}
                </div>
            )}

            <Moeda
                turn={turno}
                setTurn={setTurno}
                dropped={dropped}
                setDropped={setDropped}
                hoveredColumn={hoveredColumn}
                winner={winner}
                trocarTurno={trocarTurno}
                bonusCoords={bonusCoords}
                setTempoRestante={setTempoRestante}
                temporizador={temporizador}
                setTempoCongelado={setTempoCongelado}
            />
        </div>
    );
}

