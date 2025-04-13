import { tamanho } from '../../../constants/constants';
import './DropZone.css';
import { useEffect, useState } from 'react';
import Moeda from '../Moeda/Moeda';

export default function DropZone({ hoveredColumn }) {
    const [turn, setTurn] = useState(2);
    const [dropped, setDropped] = useState([]);

    return (
        <div className='drop-zone'>
            {dropped.map((m, i) => 
        <div 
            key={i} 
            className={`p${m.jogador}`} 
            style={{ transform: `translate(${m.y * tamanho}px, ${m.x * tamanho + 120}px)` }}
        />
    )}

            <Moeda 
                turn={turn} 
                setTurn={setTurn} 
                dropped={dropped} 
                setDropped={setDropped} 
                hoveredColumn={hoveredColumn} 
            />
        </div>
    );
}
