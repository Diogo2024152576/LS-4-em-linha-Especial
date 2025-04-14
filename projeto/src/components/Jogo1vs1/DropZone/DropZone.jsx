import { colunas, linhas, tamanho } from '../../../constants/constants';
import './DropZone.css';
import { useEffect, useState } from 'react';
import Moeda from '../Moeda/Moeda';
import { encontrarVencedor } from '../Vencedor/encontrarVencedor'

export default function DropZone({ hoveredColumn, winner, setWinner}) {
    const [turn, setTurn] = useState(1); //jogador que inicia a jogar
    const [dropped, setDropped] = useState([]);

    
    useEffect(() => {
        const vencedorJogo = encontrarVencedor(dropped, linhas, colunas)
        setWinner(vencedorJogo)
    }, [dropped, setWinner]) 
    
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
                winner={winner}
            />
        </div>
    );
}
