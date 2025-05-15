import React, { useEffect, useState, useCallback, useRef } from 'react';

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
    setLastPlayerColumn,
    limparTabelaTrigger,
}) {
    const [column, setColumn] = useState(0);
    const [row, setRow] = useState();
    const [dropping, setDropping] = useState(false);
    const cpuJogandoRef = useRef(false);
    const cpuTimeoutRef = useRef();
    const lastPlayerColumn = useRef(null);

    useEffect(() => {
        if (!dropping && hoveredColumn !== undefined && hoveredColumn !== column) {
            setColumn(hoveredColumn);
        }
    }, [hoveredColumn, column, dropping]);

    // Sempre que o turno muda para o jogador humano, alinhar a bola ativa com a coluna hovered
    useEffect(() => {
        if (turn === 1 && hoveredColumn !== undefined) {
            setColumn(hoveredColumn);
        }
    }, [turn, hoveredColumn]);

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

    // Resetar o lock apenas quando o turno muda para o jogador humano
    useEffect(() => {
        if (turn === 1) {
            cpuJogandoRef.current = false;
        }
    }, [turn]);

    // CPU joga automaticamente
    useEffect(() => {
        if (winner !== 0) return;
        if (turn === 2 && !cpuJogandoRef.current) {
            cpuJogandoRef.current = true;
            let colunaValida = Math.floor(Math.random() * 7);
            while (dropped.filter(drop => drop.y === colunaValida).length >= 6) {
                colunaValida = Math.floor(Math.random() * 7);
            }
            cpuTimeoutRef.current = setTimeout(() => {
                setHoveredColumn(colunaValida);
                cpuTimeoutRef.current = setTimeout(() => {
                    dropMoeda(colunaValida);
                    // O lock só é libertado quando o turno mudar (useEffect acima)
                }, 1500);
            }, 1000);
        }
        return () => {
            if (cpuTimeoutRef.current) clearTimeout(cpuTimeoutRef.current);
        };
    }, [turn, winner, dropped, dropMoeda, setHoveredColumn]);

    // Libertar o lock sempre que dropped mudar e o turno for 2 (PC pode jogar de novo)
    useEffect(() => {
        if (turn === 2) {
            cpuJogandoRef.current = false;
        }
    }, [dropped, turn]);

    const handleDoubleClick = useCallback((event) => {
        if (winner !== 0) return;
        if (turn !== 1) return; // Só jogador humano
        if (event.button === 0) {
            if (setLastPlayerColumn) setLastPlayerColumn(column);
            dropMoeda(column);
        }
    }, [winner, turn, column, dropMoeda, setLastPlayerColumn]);

    useEffect(() => {
        setRow();
    }, [turn]);

    useEffect(() => {
        document.addEventListener('dblclick', handleDoubleClick);
        return () => {
            document.removeEventListener('dblclick', handleDoubleClick);
        };
    }, [column, winner, handleDoubleClick]);

    useEffect(() => {
        cpuJogandoRef.current = false;
    }, [limparTabelaTrigger]);

    return (
        <>
            {(winner === 0 && dropped.length < 42) && (
                <div className={`active p${turn} column-${column ?? '-'} row-${row === undefined ? '-' : row} ${dropping ? 'dropping' : ''}`} />
            )}
        </>
    );
}
