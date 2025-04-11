import './menuSelecao.css'

export default function MenuSelecaoJogo({startGamePlvsPl, startGamePlvsCmp}) {
    return(
        <div className="selecaoJogada">
            <h1>4 Em Linha Especial</h1>
            <div className="selecao">
                <button onClick={startGamePlvsPl}>1 vs 1</button>
                <button onClick={startGamePlvsCmp}>1 vs Computador</button>
            </div>
        </div>
    )
}