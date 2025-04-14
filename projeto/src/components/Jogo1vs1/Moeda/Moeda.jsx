import React, { useEffect, useState } from 'react';
import { temporizador } from '../../../constants/constants';

export default function Moeda({ 
    turn,
    setTurn,
    dropped,
    setDropped,
    hoveredColumn,
    winner,
    trocarTurno,
    jogadaBloqueada,
    setJogadaBloqueada,
    setTempoRestante
}) {
    const [column, setColumn] = useState(0);
    const [row, setRow] = useState();
    const [dropping, setDropping] = useState(false);


    useEffect(() => {
        if (hoveredColumn !== undefined && hoveredColumn !== column) {
            setColumn(hoveredColumn);
        }
    }, [hoveredColumn]);

    const dropMoeda = () => {
        if (winner !== 0 || jogadaBloqueada) return;
    
        if (dropped.find(drop => drop.x === 0 && drop.y === (column || 0))) return;
    
        const len = 5 - dropped.filter(drop => drop.y === (column || 0)).length;
    
        setJogadaBloqueada(true);
        setRow(len);
        setDropping(true); // agora é dropping!
    
        setTimeout(() => {
            setDropped([...dropped, { x: len, y: column || 0, jogador: turn }]);
            setTurn(turn === 1 ? 2 : 1);
            setDropping(false);
            setJogadaBloqueada(false);
        }, 500);
    };
    

    const handleKeyDown = (event) => {
        if (winner !== 0 || jogadaBloqueada) return;

        if ((event.key === 'ArrowLeft' || event.key === 'A' || event.key === 'a') && column > 0) {
            setColumn(column - 1);
        } else if ((event.key === 'ArrowRight' || event.key === 'D' || event.key === 'd') && column < 6) {
            setColumn(column + 1);
        } else if (event.key === 'Enter' || event.key === ' ') {
            dropMoeda();
        }
    };

    const handleDoubleClick = (event) => {
        if (winner !== 0 || jogadaBloqueada) return;
        if (event.button === 0) {
            dropMoeda();
        }
    };

    useEffect(() => {
        setColumn(0);
        setRow();
    }, [turn]);

    useEffect(() => {
        document.addEventListener('keyup', handleKeyDown);
        document.addEventListener('dblclick', handleDoubleClick);

        return () => {
            document.removeEventListener('keyup', handleKeyDown);
            document.removeEventListener('dblclick', handleDoubleClick);
        };
    }, [column, jogadaBloqueada, winner]);

    return (
        <>
            {(winner === 0 && dropped.length < 42) && (
                <div className={`active p${turn} column-${column ?? '-'} row-${row === undefined ? '-' : row} ${dropping ? 'dropping' : ''}`} />
            )}
        </>
    );
}
