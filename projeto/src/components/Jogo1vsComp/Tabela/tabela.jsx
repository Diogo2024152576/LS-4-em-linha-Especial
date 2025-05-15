import './tabela.css';
import { linhas, colunas } from '../../../constants/constants';
import DropzoneVsPC from '../DropZone/DropZone';
import { useEffect, useState, useRef } from 'react';

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
    const [posicoesVencedoras, setPosicoesVencedoras] = useState([]);
    const lastPlayerColumn = useRef(0);

    // Limpa tabela quando trigger mudar
    useEffect(() => {
        const novaTabela = new Array(linhas).fill().map(() => new Array(colunas).fill(''));
        setTabela(novaTabela);
        setPosicoesVencedoras([]);
    }, [limparTabelaTrigger]);

    // Atualiza posicoesVencedoras sempre que winner mudar
    useEffect(() => {
        if (winner === 1 || winner === 2) {
            // A lógica de atualização de posicoesVencedoras está no DropZone
        } else {
            setPosicoesVencedoras([]);
        }
    }, [winner]);

    // Função para guardar a última coluna jogada pelo jogador humano
    const setLastPlayerColumn = (col) => {
        lastPlayerColumn.current = col;
    };

    // Quando o turno volta para o jogador humano, restaurar hoveredColumn
    useEffect(() => {
        if (turno === 1) {
            setHoveredColumn(lastPlayerColumn.current);
        }
    }, [turno]);

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
                    setLastPlayerColumn={setLastPlayerColumn}
                    posicoesVencedoras={posicoesVencedoras}
                    setPosicoesVencedoras={setPosicoesVencedoras}
                />
            </div>
            <div className='borda-tabela'>
                <div className='tabela'>
                    {tabela.map((linha, i) =>
                        linha.map((celula, j) => (
                            <div
                                key={i + '-' + j}
                                className={`${celula} ${hoveredColumn === j ? 'coluna-hover' : ''}`}
                                onMouseEnter={() => turno === 1 && setHoveredColumn(j)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
