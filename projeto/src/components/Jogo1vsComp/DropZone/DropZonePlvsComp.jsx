import {colunas, linhas, tamanho} from '../../../constants/constants'
import './DropZonePlvsComp.css'
import {useEffect, useState} from 'react'
import Moeda from '../../Jogo1vs1/Moeda/Moeda'
import {encontrarVencedor} from '../../Jogo1vs1/Vencedor/encontrarVencedor' 

export default function DropZonePlvsComp({ hoveredColumn, winner, setWinner}) {
    const [turn, setTurn] = useState(1) // jogador a  iniciar jogo 
    const [dropped, setDropped] = useState([])

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
    )
}