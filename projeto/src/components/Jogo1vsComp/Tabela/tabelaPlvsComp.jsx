import './tabelaPlvsComp.css'
import {linhas, colunas} from '../../../constants/constants'
import {useState} from 'react'
import DropZonePlvsComp from '../DropZone/DropZonePlvsComp'

export default function TabelaPlvsComp({winner, setWinner}) {
    const [hoverColumn, setHoverColumn] = useState(null)
    
    const tabela = 
        new Array(linhas)
        .fill()
        .map(() => new Array(colunas).fill('')) 

    return (
        <div className='container'>
            <div className='drop'>
                <DropZonePlvsComp 
                    hoverColumn={hoverColumn}
                    winner={winner}
                    setWinner={setWinner}
                />
            </div>
            <div className='tabela'>
                {tabela.map((linha, i) =>   
                    linha.map((_, j) => (
                        <div 
                            key={i + '-' + j}
                            onMouseEnter={() => setHoverColumn(j)}
                            onMouseLeave={() => setHoverColumn(null)}
                        />
                    ))
                )}
            </div>
        </div>
    )
}