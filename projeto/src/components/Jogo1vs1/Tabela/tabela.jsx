import './tabela.css';
import { linhas, colunas } from '../../../constants/constants';
import Dropzone from '../DropZone/DropZone';
import { useEffect, useState } from 'react';
import { encontrarVencedor } from '../Vencedor/encontrarVencedor';

export default function Tabela({
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
    const [posicoesVencedoras, setPosicoesVencedoras] = useState([]);
    
    // Efeito para limpar tabela sempre que trigger mudar
    useEffect(() => {
        const novaTabela = new Array(linhas).fill().map(() => new Array(colunas).fill(''));
        setTabela(novaTabela);
        setPosicoesVencedoras([]);
    }, [limparTabelaTrigger]);

    // Atualiza posicoesVencedoras sempre que winner mudar
    useEffect(() => {
        if (winner === 1 || winner === 2) {
            // Precisa obter as posições vencedoras a partir do dropped
            // Como dropped está em DropZone, não temos acesso aqui diretamente
            // Então, a lógica de atualização de posicoesVencedoras deve ser feita em DropZone e passada para cá
        } else {
            setPosicoesVencedoras([]);
        }
    }, [winner]);

    return (
        <div className='container'>
            <div className='drop'>
                <Dropzone
                    hoveredColumn={hoveredColumn}
                    winner={winner}
                    setWinner={setWinner}
                    posicoesVencedoras={posicoesVencedoras}
                    setPosicoesVencedoras={setPosicoesVencedoras}
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
