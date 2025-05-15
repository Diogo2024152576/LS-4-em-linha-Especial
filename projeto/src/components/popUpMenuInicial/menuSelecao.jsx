import './menuSelecao.css'
import pvspImage from '../../assets/images/pvsp.png'
import pvspcImage from '../../assets/images/pvspc.png'

export default function MenuSelecaoJogo({startGamePlvsPl, startGamePlvsCmp}) {
    return(
        <div className="selecaoJogada">
            <h1>4 Em Linha Especial</h1>
            <div className="selecao">
                <button onClick={startGamePlvsPl} className='pvsp'>
                    <img src={pvspImage} alt="Jogador vs Jogador" />
                </button>
                <button onClick={startGamePlvsCmp} className='pvspc'>
                    <img src={pvspcImage} alt="Jogador vs Computador"/>
                </button>
            </div>
        </div>
    )
}