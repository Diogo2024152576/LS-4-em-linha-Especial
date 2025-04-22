import React, { useEffect, useState, useCallback } from 'react';

export default function Moeda({ 
    turn,
    setTurn,
    dropped,
    setDropped,
    hoveredColumn,
    winner,
    bonusCoords,
    setTempoRestante,
    setTempoCongelado,
}) {
    const [column, setColumn] = useState(0);
    const [row, setRow] = useState();
    const [dropping, setDropping] = useState(false);

    useEffect(() => {
        if (!dropping && hoveredColumn !== undefined && hoveredColumn !== column) {
            setColumn(hoveredColumn);
        }
    }, [hoveredColumn, column, dropping]);

    const dropMoeda = useCallback(() => {
        if (winner !== 0) return;

        if (dropped.find(drop => drop.x === 0 && drop.y === (column || 0))) return;

        const len = 5 - dropped.filter(drop => drop.y === (column || 0)).length;

        setTempoCongelado(true); 
        setRow(len);
        setDropping(true);

        setTimeout(() => {
            const novaMoeda = { x: len, y: column || 0, jogador: turn };
            const caiuEmBonus = bonusCoords.some(b => b.x === novaMoeda.x && b.y === novaMoeda.y);

            setDropped(prevDropped => [...prevDropped, novaMoeda]);

            if (caiuEmBonus) {
                setTempoRestante(10);
                // turno continua
            } else {
                setTurn(turn === 1 ? 2 : 1);
            }

            setDropping(false);
            setTempoCongelado(false);

            setTimeout(() => {
                setRow(undefined);
            }, 0);
        }, 300); // Duração da queda

    }, [winner, dropped, column, turn, bonusCoords, setDropped, setTurn, setTempoRestante, setTempoCongelado]);

    const handleDoubleClick = useCallback((event) => {
        if (winner !== 0) return;
        if (event.button === 0) {
            dropMoeda();
        }
    }, [winner, dropMoeda]);

    // Reset da linha suspensa a cada novo turno
    useEffect(() => {
        setRow();
    }, [turn]);

    // Evento de clique duplo para dropar
    useEffect(() => {
        document.addEventListener('dblclick', handleDoubleClick);
        return () => {
            document.removeEventListener('dblclick', handleDoubleClick);
        };
    }, [column, winner, handleDoubleClick]);

    return (
        <>
            {(winner === 0 && dropped.length < 42) && (
                <div className={`active p${turn} column-${column ?? '-'} row-${row === undefined ? '-' : row} ${dropping ? 'dropping' : ''}`} />
            )}
        </>
    );
}
