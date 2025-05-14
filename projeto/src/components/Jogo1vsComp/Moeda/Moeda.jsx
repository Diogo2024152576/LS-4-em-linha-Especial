import React, { useEffect, useState, useCallback } from 'react';

export default function MoedaVsPC({
    turn,
    setTurn,
    dropped,
    setDropped,
    hoveredColumn,
    setHoveredColumn,
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

    // Função para dropar moeda
    const dropMoeda = useCallback((colunaSelecionada) => {
        if (winner !== 0) return;

        // Cheio na coluna
        if (dropped.find(drop => drop.x === 0 && drop.y === colunaSelecionada)) return;

        const len = 5 - dropped.filter(drop => drop.y === colunaSelecionada).length;

        setTempoCongelado(true);
        setRow(len);
        setDropping(true);

        setTimeout(() => {
            const novaMoeda = { x: len, y: colunaSelecionada, jogador: turn };
            const caiuEmBonus = bonusCoords.some(b => b.x === novaMoeda.x && b.y === novaMoeda.y);

            setDropped(prev => [...prev, novaMoeda]);

            if (caiuEmBonus) {
                setTempoRestante(10);
                // Continua o mesmo turno
            } else {
                setTurn(turn === 1 ? 2 : 1);
            }

            setDropping(false);
            setTempoCongelado(false);

            setTimeout(() => {
                setRow(undefined);
            }, 0);
        }, 300); // Duração da queda
    }, [winner, dropped, turn, bonusCoords, setDropped, setTurn, setTempoRestante, setTempoCongelado]);

    // CPU joga automaticamente
    useEffect(() => {
        if (winner !== 0) return;
        if (turn === 2) {
            let colunaValida = Math.floor(Math.random() * 7);
            while (dropped.filter(drop => drop.y === colunaValida).length >= 6) {
                colunaValida = Math.floor(Math.random() * 7);
            }
            setTimeout(() => {
                setHoveredColumn(colunaValida);
                setTimeout(() => {
                    dropMoeda(colunaValida);
                }, 3000); // 3 segundos depois de mover
            }, 1000); // 1 segundo para mover
        }
    }, [turn, winner, dropped, dropMoeda, setHoveredColumn]);


    const handleDoubleClick = useCallback((event) => {
        if (winner !== 0) return;
        if (turn !== 1) return; // Só jogador humano
        if (event.button === 0) {
            dropMoeda(column);
        }
    }, [winner, turn, column, dropMoeda]);

    useEffect(() => {
        setRow();
    }, [turn]);

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
