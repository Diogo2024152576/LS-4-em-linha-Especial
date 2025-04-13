import React, { useEffect, useState } from 'react';

export default function Moeda({ turn, setTurn, dropped, setDropped, hoveredColumn }) {
    const [column, setColumn] = useState(0);
    const [row, setRow] = useState();

    useEffect(() => {
        if (hoveredColumn !== undefined && hoveredColumn !== column) {
            setColumn(hoveredColumn);
        }
    }, [hoveredColumn]);

    const handleKeyDown = (event) => {
        if ((event.key === 'ArrowLeft' || event.key === 'A' || event.key === 'a') && column > 0) {
            setColumn(column - 1);
        } else if (event.key === 'ArrowRight' || event.key === 'D' || event.key === 'd') {
            if (column === undefined) {
                setColumn(1);
            } else if (column < 6) {
                setColumn(column + 1);
            }
        } else if (event.key === 'Enter' || event.key === ' ') {
            if (dropped.find(drop => drop.x === 0 && drop.y === (column || 0))) return;

            const len = 5 - dropped.filter(drop => drop.y === (column || 0)).length;

            setRow(len);
            setTimeout(() => {
                setDropped([...dropped, { x: len, y: column || 0, jogador: turn }]);
                setTurn(turn === 1 ? 2 : 1);
            }, 500);
        }
    };

    useEffect(() => {
        setColumn(0);
        setRow();
    }, [turn]);

    useEffect(() => {
        document.addEventListener('keyup', handleKeyDown, false);
        return () => {
            document.removeEventListener('keyup', handleKeyDown, false);
        };
    });

    return (
        <div className={`active p${turn} column-${column || '-'} row-${row === undefined ? '-' : row}`} />
    );
    
    
}
