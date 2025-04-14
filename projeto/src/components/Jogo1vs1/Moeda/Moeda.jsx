import React, { useEffect, useState } from 'react';

export default function Moeda({ turn, setTurn, dropped, setDropped, hoveredColumn, winner}) {
    const [column, setColumn] = useState(0);
    const [row, setRow] = useState();

    useEffect(() => {
        if (hoveredColumn !== undefined && hoveredColumn !== column) {
            setColumn(hoveredColumn);
        }
    }, [hoveredColumn]);

    const dropMoeda = () => {
        if (winner !== 0) return //bloqueia proxima jogada se ja houver um vencedor

        if (dropped.find(drop => drop.x === 0 && drop.y === (column || 0))) return;

        const len = 5 - dropped.filter(drop => drop.y === (column || 0)).length;

        setRow(len);
        setTimeout(() => {
            setDropped([...dropped, { x: len, y: column || 0, jogador: turn }]);
            setTurn(turn === 1 ? 2 : 1);
        }, 500);
    };

    const handleKeyDown = (event) => {
        if (winner !== 0) return //bloqueia interações com o teclado
        if ((event.key === 'ArrowLeft' || event.key === 'A' || event.key === 'a') && column > 0) {
            setColumn(column - 1);
        } else if (event.key === 'ArrowRight' || event.key === 'D' || event.key === 'd') {
            if (column === undefined) {
                setColumn(1);
            } else if (column < 6) {
                setColumn(column + 1);
            }
        } else if (event.key === 'Enter' || event.key === ' ') {
            dropMoeda();
        }
    };

    const handleDoubleClick = (event) => {
        if (winner !== 0) return //bloqueia o duplo cique se ja existir um vencedor
        if (event.button === 0) { // botão esquerdo do rato
            dropMoeda();
        }
    };

    useEffect(() => {
        setColumn(0);
        setRow();
    }, [turn]);

    useEffect(() => {
        document.addEventListener('keyup', handleKeyDown, false);
        document.addEventListener('dblclick', handleDoubleClick, false);

        return () => {
            document.removeEventListener('keyup', handleKeyDown, false);
            document.removeEventListener('dblclick', handleDoubleClick, false);
        };
    });

    return (
        <>
            {(winner === 0 && dropped.length < 42) && (
                <div className={`active p${turn} column-${column || '-'} row-${row === undefined ? '-' : row}`} />
            )}
        </>
    );
}
