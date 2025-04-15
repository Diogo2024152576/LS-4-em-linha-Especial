import { colunas, linhas, tamanho } from '../../../constants/constants';
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
    jogadaBloqueada,
    setJogadaBloqueada,
}) {
    const [dropped, setDropped] = useState([]);

    useEffect(() => {
        const vencedorJogo = encontrarVencedor(dropped, linhas, colunas);
        setWinner(vencedorJogo);
    }, [dropped, setWinner]);

    return (
        <div className='drop-zone'>
            {dropped.map((m, i) =>
                <div
                    key={i}
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
                jogadaBloqueada={jogadaBloqueada}
                setJogadaBloqueada={setJogadaBloqueada}
            />
        </div>
    );
}
//acess main