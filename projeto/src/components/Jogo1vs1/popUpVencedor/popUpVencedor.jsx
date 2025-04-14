import React from 'react'
import './popUpVencedor.css'

export default function PopUpVencedor({ winner, player1, player2, onReplay, onReset }) {
    return (
        <div className='popup-winner'>
            <div className='inner-box'>
                <div className='texto'>
                    {winner === -1
                        ? <span>Ninguém venceu (Empate)</span>
                        : <span>O jogador <strong>{winner === 1 ? player1 : player2}</strong> venceu!</span>
                    }
                </div>
                <div className='botoes'>
                    <button onClick={null}>Jogar Novamente</button>
                    <button onClick={null}>Reiniciar Jogo</button>
                </div>
            </div>
        </div>
    )
}
