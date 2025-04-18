import './tabela.css';
import { linhas, colunas } from '../../../constants/constants';
import Dropzone from '../DropZone/DropZone';
import { useEffect, useState } from 'react';

export default function Tabela({
    winner,
    setWinner,
    turno,
    setTurno,
    trocarTurno,
    jogadaBloqueada,
    setJogadaBloqueada,
    setTempoRestante,
    limparTabelaTrigger,
    bonusCoords,
}) {
    const [hoveredColumn, setHoveredColumn] = useState(0);
    const [tabela, setTabela] = useState(
        new Array(linhas).fill().map(() => new Array(colunas).fill(''))
    );
    
    // Efeito para limpar tabela sempre que trigger mudar
    useEffect(() => {
        const novaTabela = new Array(linhas).fill().map(() => new Array(colunas).fill(''));
        setTabela(novaTabela);
    }, [limparTabelaTrigger]);


    return (
        <div className='container'>
            <div className='drop'>
                <Dropzone
                    hoveredColumn={hoveredColumn}
                    winner={winner}
                    setWinner={setWinner}
                    turno={turno}
                    setTurno={setTurno}
                    trocarTurno={trocarTurno}
                    jogadaBloqueada={jogadaBloqueada}
                    setJogadaBloqueada={setJogadaBloqueada}
                    setTempoRestante={setTempoRestante}
                    setTabela={setTabela}
                    limparTabelaTrigger={limparTabelaTrigger}
                    bonusCoords={bonusCoords}

                />
            </div>
            <div className='borda-tabela'>
                <div className='tabela'>
                    {tabela.map((linha, i) =>
                        linha.map((celula, j) => (
                            <div
                                key={i + '-' + j}
                                className={`${celula} ${hoveredColumn === j ? 'coluna-hover' : ''}`}
                                onMouseEnter={() => setHoveredColumn(j)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
