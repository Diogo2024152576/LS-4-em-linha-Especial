import { colunas, linhas, tamanho, temporizador } from '../../../constants/constants';
import './DropZone.css';
import { useEffect, useState } from 'react';
import Moeda from '../Moeda/Moeda';
import { encontrarVencedor } from '../Vencedor/encontrarVencedor';

export default function DropZone({
    hoveredColumn,
    winner,
    setWinner,
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
        const vencedorJogo = encontrarVencedor(dropped, linhas, colunas);
        setWinner(vencedorJogo);
    }, [dropped, setWinner]);

    useEffect(() => {
        setDropped([]);
    }, [limparTabelaTrigger]);

    const isBonus = (x, y) => {
        return bonusCoords.some(coord => coord.x === x && coord.y === y);
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
                    style={{ transform: `translate(${m.y * tamanho}px, ${m.x * tamanho + 140}px)` }}
                />
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

