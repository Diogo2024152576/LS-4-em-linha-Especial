import React from 'react'
import './popUpVencedor.css'


export default function PopUpVencedor({ 
    winner, 
    player1, 
    player2,
    reporJogo, 
    jogarNovamente
}) {

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
                    <button onClick={jogarNovamente}>Jogar Novamente</button>
                    <button onClick={reporJogo}>Reiniciar Jogo</button>
                </div>
            </div>
        </div>
    )
}
