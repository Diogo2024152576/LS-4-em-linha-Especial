import React, { useEffect, useState, useCallback } from 'react';

export default function Moeda({ 
    turn,
    setTurn,
    dropped,
    setDropped,
    hoveredColumn,
    winner,
    jogadaBloqueada,
    setJogadaBloqueada,
    bonusCoords,
    setTempoRestante,
}) {
    const [column, setColumn] = useState(0);
    const [row, setRow] = useState();
    const [dropping, setDropping] = useState(false);

    useEffect(() => {
        if (hoveredColumn !== undefined && hoveredColumn !== column) {
            setColumn(hoveredColumn);
        }
    }, [hoveredColumn, column]);

    const dropMoeda = useCallback(() => {
        if (winner !== 0 || jogadaBloqueada) return;

        if (dropped.find(drop => drop.x === 0 && drop.y === (column || 0))) return;

        const len = 5 - dropped.filter(drop => drop.y === (column || 0)).length;

        setJogadaBloqueada(true);
        setRow(len);
        setDropping(true);

        setTimeout(() => {
            const novaMoeda = { x: len, y: column || 0, jogador: turn };
            const caiuEmBonus = bonusCoords.some(b => b.x === novaMoeda.x && b.y === novaMoeda.y);

            setDropped(prevDropped => [...prevDropped, novaMoeda]);

            if (caiuEmBonus) {
                setTempoRestante(10);
                // Mantém o turno
            } else {
                setTurn(turn === 1 ? 2 : 1); // Alterna turno
            }

            setDropping(false);
            setJogadaBloqueada(false);

            // Reset da moeda suspensa
            setTimeout(() => {
                setRow(undefined);
            }, 0);
        }, 500);

    }, [winner, jogadaBloqueada, dropped, column, turn, setJogadaBloqueada, bonusCoords, setDropped, setTurn, setTempoRestante]);

    const handleDoubleClick = useCallback((event) => {
        if (winner !== 0 || jogadaBloqueada) return;
        if (event.button === 0) {
            dropMoeda();
        }
    }, [winner, jogadaBloqueada, dropMoeda]);

    useEffect(() => {
        setRow();
    }, [turn]);

    useEffect(() => {
        document.addEventListener('dblclick', handleDoubleClick);

        return () => {
            document.removeEventListener('dblclick', handleDoubleClick);
        };
    }, [column, jogadaBloqueada, winner, handleDoubleClick]);

    return (
        <>
            {(winner === 0 && dropped.length < 42) && (
                <div className={`active p${turn} column-${column ?? '-'} row-${row === undefined ? '-' : row} ${dropping ? 'dropping' : ''}`} />
            )}
        </>
    );
}
