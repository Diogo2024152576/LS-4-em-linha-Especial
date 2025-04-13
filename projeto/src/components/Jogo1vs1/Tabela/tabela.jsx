import './tabela.css'
import { linhas, colunas } from '../../../constants/constants';
import Dropzone from '../../DropZone/DropZone';
import { useState } from 'react';

export default function Tabela() {
    const [hoveredColumn, setHoveredColumn] = useState(null);

    const tabela = 
        new Array(linhas)
        .fill()
        .map(() => new Array(colunas).fill(''));

    return (
        <div className='container'>
            <div className='drop'>
                <Dropzone hoveredColumn={hoveredColumn} />
            </div>
            <div className='tabela'> 
                {tabela.map((linha, i) => 
                    linha.map((_, j) => (
                        <div 
                            key={i + '-' + j}
                            onMouseEnter={() => setHoveredColumn(j)}
                            onMouseLeave={() => setHoveredColumn(null)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
