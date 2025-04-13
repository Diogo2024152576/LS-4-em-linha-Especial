import './jogo1vs1.css'
import sairImage from '../../../assets/images/sair.png';
import Tabela from '../Tabela/tabela'
import DropZone from '../../DropZone/DropZone';

export default function JogoPlvsPl({ player1, player2, voltarAoMenu }) {
    return (
        <div className='jogo-main'>
            <div className='jogo'>
                <div className='tabela-jogo'>
                    <h2>4 Em Linha Especial</h2>
                    <p>Jogador : {player1} vs Jogador :  {player2}</p>
                </div>
                <div className='ct-tabela-jogo'>
                    {/*<DropZone />*/}
                    <Tabela />
                </div>
            </div>
            <div className='sair' onClick={voltarAoMenu}>
                <button id="sair">
                    <img src={sairImage} alt="Voltar ao menu"/>
                </button>
                <p>Sair do Jogo</p>
            </div>
        </div>
    )
}