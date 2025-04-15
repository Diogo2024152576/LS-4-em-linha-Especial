import React, { useEffect, useState, useCallback} from 'react';

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
            setDropped(prevDropped => [...prevDropped, { x: len, y: column || 0, jogador: turn }]);
            setTurn(turn === 1 ? 2 : 1);
            setDropping(false);
            setJogadaBloqueada(false);

            // Delay extra só para limpar o "row" e permitir a nova moeda suspensa aparecer
            setTimeout(() => {
                setRow(undefined);
            }, 0); // <- podes ajustar este valor se precisares
        }, 500);

    }, [winner, jogadaBloqueada, dropped, column, turn, setJogadaBloqueada, setRow, setDropping, setDropped, setTurn]);



    const handleDoubleClick = useCallback((event) => {
        if (winner !== 0 || jogadaBloqueada) return;
        if (event.button === 0) {
            dropMoeda();
        }
    }, [winner, jogadaBloqueada, dropMoeda]);

    useEffect(() => {
        // Agora, NÃO resetamos column ao trocar de turno
        setRow(); // Isso ainda pode ser resetado
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
