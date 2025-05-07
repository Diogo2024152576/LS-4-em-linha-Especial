import './tabela.css';
import { linhas, colunas } from '../../../constants/constants';
import DropzoneVsPC from '../DropZone/DropZone';
import { useEffect, useState } from 'react';

export default function TabelaVsPC({
    winner,
    setWinner,
    turno,
    setTurno,
    trocarTurno,
    setTempoRestante,
    limparTabelaTrigger,
    bonusCoords,
    setTempoCongelado,
}) {
    const [hoveredColumn, setHoveredColumn] = useState(0);
    const [tabela, setTabela] = useState(
        new Array(linhas).fill().map(() => new Array(colunas).fill(''))
    );

    // Limpa tabela quando trigger mudar
    useEffect(() => {
        const novaTabela = new Array(linhas).fill().map(() => new Array(colunas).fill(''));
        setTabela(novaTabela);
    }, [limparTabelaTrigger]);

    return (
        <div className='container'>
            <div className='drop'>
                <DropzoneVsPC
                    hoveredColumn={hoveredColumn}
                    setHoveredColumn={setHoveredColumn}
                    winner={winner}
                    setWinner={setWinner}
                    turno={turno}
                    setTurno={setTurno}
                    trocarTurno={trocarTurno}
                    setTempoRestante={setTempoRestante}
                    setTabela={setTabela}
                    limparTabelaTrigger={limparTabelaTrigger}
                    bonusCoords={bonusCoords}
                    setTempoCongelado={setTempoCongelado}
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
