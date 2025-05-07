import React from 'react'
import './popUpVencedor.css'
import sairImage from '../../../assets/images/sair_w.png';


export default function PopUpVencedor({ 
    winner, 
    player1, 
    player2,
    reporJogo, 
    jogarNovamente,
    voltarMenu
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
                    <button onClick={reporJogo}>Trocar Jogadores</button>
                    <button onClick={voltarMenu}>
                        <img src={sairImage} alt="Voltar ao menu" />
                        <p>Sair do Jogo</p>                
                    </button>
                </div>
            </div>
        </div>
    )
}
