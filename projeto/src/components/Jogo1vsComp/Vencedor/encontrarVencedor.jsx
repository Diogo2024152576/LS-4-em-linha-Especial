
const VerificarVitoria = (jogador, dropped, linhas, colunas) => {
    const jogadasJogadores = dropped.filter(d => d.jogador === jogador)

    return jogadasJogadores.some(({ x, y}) => {
        //verificacao horizontal 
        if (jogadasJogadores.find(m => x === m.x + 1 && y === m.y) &&
            jogadasJogadores.find(m => x === m.x + 2 && y === m.y) &&
            jogadasJogadores.find(m => x === m.x + 3 && y === m.y)) return true
        //verificao vertical
        if (jogadasJogadores.find(m => x === m.x && y === m.y + 1) &&
            jogadasJogadores.find(m => x === m.x && y === m.y + 2) &&
            jogadasJogadores.find(m => x === m.x && y === m.y + 3)) return true
        //verificao diagonal descendente   
        if (jogadasJogadores.find(m => x === m.x + 1 && y === m.y + 1) &&
            jogadasJogadores.find(m => x === m.x + 2 && y === m.y + 2) &&
            jogadasJogadores.find(m => x === m.x + 3 && y === m.y + 3)) return true
        //verificao diagonal ascendente    
        if (jogadasJogadores.find(m => x === m.x + 1 && y === m.y - 1) &&
            jogadasJogadores.find(m => x === m.x + 2 && y === m.y - 2) &&
            jogadasJogadores.find(m => x === m.x + 3 && y === m.y - 3)) return true   
        return false
    })
}

const encontrarVencedor = (dropped, linhas, colunas) => {
    //vitoria jogador 1
    if (VerificarVitoria(1, dropped, linhas, colunas)) return 1
    //vitoria jogador 2
    if (VerificarVitoria(2, dropped, linhas, colunas)) return 2
    //empate
    if (dropped.length === linhas * colunas) return -1

    return 0; // sem vencedor encontrado
}

export { encontrarVencedor }