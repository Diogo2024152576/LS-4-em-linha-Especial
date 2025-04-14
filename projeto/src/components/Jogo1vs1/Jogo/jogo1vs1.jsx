import './jogo1vs1.css'
import sairImage from '../../../assets/images/sair.png';
import Tabela from '../Tabela/tabela'
import DropZone from '../DropZone/DropZone';
import { useState } from 'react';
import PopUpVencedor from '../popUpVencedor/popUpVencedor'

export default function JogoPlvsPl({ player1, player2, voltarAoMenu }) {
    const [winner, setWinner] = useState(0); 
    // 0 - nenhum vencdor 
    // 1 - pl1
    // 2 -pl2
    return (
        <div className='jogo-main'>
            <div className='jogo'>
                <div className='tabela-jogo'>
                    <h2>4 Em Linha Especial</h2>
                    <p>Jogador : {player1} vs Jogador :  {player2}</p>
                </div>
                <div className='ct-tabela-jogo'>
                    {/*<DropZone />*/}
                    <Tabela winner={winner} setWinner={setWinner}/>
                </div>

            </div>
            <div className='sair' onClick={voltarAoMenu}>
                <button id="sair">
                    <img src={sairImage} alt="Voltar ao menu"/>
                </button>
                <p>Sair do Jogo</p>
            </div>
            <div className={`popup-Vencedor ${winner !== 0 ? 'show' : ''}`}>
                {winner !== 0 && (
                    <PopUpVencedor 
                        winner={winner}
                        player1={player1}
                        player2={player2}
                    />
                )}
            </div>
        </div>
    )
}