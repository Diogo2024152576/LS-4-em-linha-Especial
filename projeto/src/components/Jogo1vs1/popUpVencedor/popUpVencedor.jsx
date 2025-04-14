import React from 'react'
import './popUpVencedor.css'

export default function PopUpVencedor({winner, player1, player2}) {
    console.log("vencedor :  " + winner)
    return (
        <div className='popup-winner'>
            <div className='texto'>
            {winner === -1
                ? <span>Ninguém venceu (Empate)</span>
                : <span>O jogador {winner === 1 ? player1 : player2} venceu!</span>
            }
            </div>
            <div className='botoes'>
                <button onClick={null}>Jogar Novamente</button>
                <button onClick={null}>Reiniciar Jogo</button>
            </div>
        </div>
    )
}