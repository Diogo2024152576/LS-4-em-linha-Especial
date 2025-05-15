// Verifica se um jogador específico tem uma sequência vencedora de 4 peças
const VerificarVitoria = (jogador, dropped) => {
    // Filtra apenas as jogadas do jogador atual
    const jogadasJogadores = dropped.filter(d => d.jogador === jogador);

    // Para cada peça do jogador, verifica se forma uma sequência vencedora
    for (const { x, y } of jogadasJogadores) {
        // Define as coordenadas para verificar 4 peças em linha horizontal
        const horizontal = [
            { x, y },
            { x: x + 1, y },
            { x: x + 2, y },
            { x: x + 3, y },
        ];
        // Verifica se todas as posições horizontais contêm peças do jogador
        if (horizontal.every(pos => jogadasJogadores.find(m => m.x === pos.x && m.y === pos.y))) {
            return horizontal; // Retorna as posições da sequência vencedora
        }

        // Define as coordenadas para verificar 4 peças em linha vertical
        const vertical = [
            { x, y },
            { x, y: y + 1 },
            { x, y: y + 2 },
            { x, y: y + 3 },
        ];
        // Verifica se todas as posições verticais contêm peças do jogador
        if (vertical.every(pos => jogadasJogadores.find(m => m.x === pos.x && m.y === pos.y))) {
            return vertical; // Retorna as posições da sequência vencedora
        }

        // Define as coordenadas para verificar 4 peças em diagonal descendente (↘)
        const diagonalDesc = [
            { x, y },
            { x: x + 1, y: y + 1 },
            { x: x + 2, y: y + 2 },
            { x: x + 3, y: y + 3 },
        ];
        // Verifica se todas as posições da diagonal descendente contêm peças do jogador
        if (diagonalDesc.every(pos => jogadasJogadores.find(m => m.x === pos.x && m.y === pos.y))) {
            return diagonalDesc; // Retorna as posições da sequência vencedora
        }

        // Define as coordenadas para verificar 4 peças em diagonal ascendente (↗)
        const diagonalAsc = [
            { x, y },
            { x: x + 1, y: y - 1 },
            { x: x + 2, y: y - 2 },
            { x: x + 3, y: y - 3 },
        ];
        // Verifica se todas as posições da diagonal ascendente contêm peças do jogador
        if (diagonalAsc.every(pos => jogadasJogadores.find(m => m.x === pos.x && m.y === pos.y))) {
            return diagonalAsc; // Retorna as posições da sequência vencedora
        }
    }
    return null; // Retorna null se não encontrar sequência vencedora
};

// Função principal que determina o vencedor do jogo
const encontrarVencedor = (dropped, linhas, colunas) => {
    // Verifica se o jogador 1 venceu
    const vitoria1 = VerificarVitoria(1, dropped);
    if (vitoria1) return { vencedor: 1, posicoesVencedoras: vitoria1 };

    // Verifica se o jogador 2 venceu
    const vitoria2 = VerificarVitoria(2, dropped);
    if (vitoria2) return { vencedor: 2, posicoesVencedoras: vitoria2 };

    // Verifica se houve empate (tabuleiro cheio)
    if (dropped.length === linhas * colunas) return { vencedor: -1, posicoesVencedoras: [] };

    // Jogo ainda em andamento
    return { vencedor: 0, posicoesVencedoras: [] };
};

export { encontrarVencedor }