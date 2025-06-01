import './info.css';
import close from '../../../assets/images/close.png';

export default function PopUpInfo({ fechar }) {
    return (
        <div className="popup-info">
            <div className='content'>
                <div className='header'>
                    <h2>Instruções do Jogo</h2>
                    <button className="fechar" onClick={fechar}>
                        <img src={close} alt="fechar"/>
                    </button>
                    
                </div>
                <div className="lista">
                    <ul>
                        <li>Para inserir a bola duplo clique com o mouse1</li>
                        <li>O objetivo é alinhar 4 moedas na horizontal, vertical ou diagonal.</li>
                        <li>Cada jogador tem um tempo limite para jogar.</li>
                        <li>Existem casas bónus no tabuleiro que concedem uma nova jogada ao jogador atual..</li>
                        <li>O primeiro a atingir 4 alinhamentos vence a ronda.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

