# 🟡🔴 4 em Linha Especial

> Trabalho Prático — Linguagens Script 2024/2025  
> DEIS · ISEC · IPC  
> Licenciatura em Engenharia Informática (LEI / LEI-CE / LEI-PL)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Arquitetura de Componentes](#arquitetura-de-componentes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Regras do Jogo](#regras-do-jogo)
- [Grupo](#grupo)

---

## 📖 Sobre o Projeto

**4 em Linha Especial** é uma variante do clássico jogo *Connect Four*, desenvolvida em **React JS** no âmbito da unidade curricular de Linguagens Script (2024/2025).

O jogo decorre numa grelha **6 × 7** (linhas × colunas) e suporta dois modos de jogo:

| Modo | Descrição |
|---|---|
| **1 vs 1** | Dois jogadores humanos alternam as jogadas no mesmo dispositivo |
| **1 vs Computador** | Um jogador humano enfrenta o computador (jogadas aleatórias) |

O objetivo é ser o primeiro a alinhar **4 peças** consecutivas — horizontal, vertical ou diagonalmente.

---

## ✨ Funcionalidades

### 🎮 Mecânicas Principais

- **Seleção de modo de jogo** — menu inicial para escolher entre 1vs1 e 1 vs Computador.
- **Inserção de nomes** — ambos os jogadores introduzem o seu nome antes do jogo começar.
- **Primeiro jogador aleatório** — o jogador que começa e a cor da sua peça são determinados de forma aleatória.
- **Identificação do jogador ativo** — destaque visual claro do jogador cuja vez é jogar.
- **Temporizador por jogada** — contagem crescente de 0 a 10 segundos por cada jogada; ao atingir o limite, a vez passa automaticamente ao adversário.
- **Células especiais (bónus)** — 5 posições aleatórias e fixas por partida, destacadas visualmente. Quando uma peça é colocada numa célula especial, o mesmo jogador joga novamente antes de passar a vez.
- **Deteção de fim de jogo** — identificação automática de vencedor (4 em linha: horizontal, vertical ou diagonal) ou empate (sem espaços livres).
- **Jogar novamente** — possibilidade de reiniciar a partida após o seu término.

### 🖱️ Colocação de Peças — Opção 3 (mais valorizada)

A inserção de peças implementa a **Opção 3** do enunciado:

1. Ao passar o rato sobre o tabuleiro, a coluna correspondente é **destacada** e é apresentada uma **seta/peça indicadora** no topo da coluna.
2. Ao clicar, a peça **desliza pela coluna** até à última célula livre, com animação de queda.

### 🤖 Modo Computador

No modo 1 vs Computador, o computador escolhe uma coluna **aleatória** entre as disponíveis, com um pequeno atraso visual para simular "pensar" antes de efetuar a jogada.

---

## 🏗️ Arquitetura de Componentes

```
App
├── MenuSelecaoJogo          → Menu inicial de seleção do modo de jogo
│
├── [Modo 1vs1] InsercaoNomes (Jogo1vs1)
│   └── Jogo (Jogo1vs1)
│       ├── Header           → Informação do jogador ativo e temporizador
│       ├── DropZone         → Zona de indicação da coluna selecionada (seta/peça)
│       ├── Tabela           → Grelha 6×7 do tabuleiro
│       │   └── Moeda        → Célula individual do tabuleiro (com animação de queda)
│       ├── PopUpInfo        → Informação inicial (jogador que começa, cor)
│       ├── popUpVencedor    → Pop-up de fim de jogo (vencedor ou empate)
│       └── Vencedor         → Gestão do estado de vencedor
│
└── [Modo 1vsComp] InsercaoNomes (Jogo1vsComp)
    └── Jogo (Jogo1vsComp)
        ├── Header           → Informação do jogador ativo e temporizador
        ├── DropZone         → Zona de indicação da coluna selecionada (seta/peça)
        ├── Tabela           → Grelha 6×7 do tabuleiro
        │   └── Moeda        → Célula individual do tabuleiro (com animação de queda)
        ├── popUpVencedor    → Pop-up de fim de jogo (vencedor ou empate)
        └── Vencedor         → Gestão do estado de vencedor
```

### Descrição dos Componentes

| Componente | Responsabilidade |
|---|---|
| `App` | Ponto de entrada. Gere o estado global de navegação entre ecrãs (menu → nomes → jogo). |
| `MenuSelecaoJogo` | Menu inicial com botões para selecionar o modo de jogo (1vs1 ou vs Computador). |
| `InsercaoNomes` | Formulário de recolha dos nomes dos jogadores antes do início da partida. |
| `Jogo` (1vs1 / 1vsComp) | Componente principal da partida. Gere o estado do tabuleiro, turno, temporizador, células especiais e lógica de vitória/empate. |
| `Header` | Exibe o nome e a cor do jogador ativo e o temporizador da jogada atual. |
| `DropZone` | Barra superior do tabuleiro que mostra o indicador (seta/peça) na coluna onde o rato se encontra. |
| `Tabela` | Renderiza a grelha 6×7. Gere os eventos de hover (destacar coluna) e clique (inserir peça). |
| `Moeda` | Representa cada célula do tabuleiro. Aplica a cor da peça e a animação de queda (deslizamento). Destaca células especiais. |
| `PopUpInfo` | Pop-up exibido no início da partida com a informação do primeiro jogador e a cor atribuída aleatoriamente. |
| `popUpVencedor` | Pop-up exibido no fim da partida com o nome do vencedor (ou mensagem de empate) e botão para jogar novamente. |
| `Vencedor` | Lógica de verificação de fim de jogo (4 em linha horizontal, vertical, diagonal, e empate). |

---

## 📁 Estrutura do Projeto

```
LS-4-em-linha-Especial/
├── Enunciado/                    # Enunciado oficial do trabalho prático
├── projeto/                      # Aplicação React
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── styles/           # Ficheiros CSS globais
│   │   ├── components/
│   │   │   ├── popUpMenuInicial/
│   │   │   │   ├── menuSelecao.jsx
│   │   │   │   └── menuSelecao.css
│   │   │   ├── Jogo1vs1/
│   │   │   │   ├── DropZone/
│   │   │   │   ├── Header/
│   │   │   │   ├── InsercaoNomes/
│   │   │   │   ├── Jogo/
│   │   │   │   ├── Moeda/
│   │   │   │   ├── PopUpInfo/
│   │   │   │   ├── Tabela/
│   │   │   │   ├── Vencedor/
│   │   │   │   └── popUpVencedor/
│   │   │   └── Jogo1vsComp/
│   │   │       ├── DropZone/
│   │   │       ├── Header/
│   │   │       ├── InsercaoNomes/
│   │   │       ├── Jogo/
│   │   │       ├── Moeda/
│   │   │       ├── Tabela/
│   │   │       ├── Vencedor/
│   │   │       └── popUpVencedor/
│   │   ├── constants/
│   │   │   └── constants.jsx     # Constantes globais do jogo
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

### Constantes do Jogo (`constants.jsx`)

| Constante | Valor | Descrição |
|---|---|---|
| `tamanho` | `100` | Tamanho (px) de cada célula do tabuleiro |
| `linhas` | `6` | Número de linhas da grelha |
| `colunas` | `7` | Número de colunas da grelha |
| `temporizador` | `10` | Tempo máximo (segundos) por jogada |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Utilização |
|---|---|---|
| [React](https://react.dev/) | `^19.1.0` | Framework principal — componentes funcionais e hooks |
| [React DOM](https://react.dev/) | `^19.1.0` | Renderização no browser |
| [Create React App](https://create-react-app.dev/) | `react-scripts 5.0.1` | Scaffolding e build do projeto |
| CSS (Vanilla) | — | Estilização dos componentes |
| JavaScript (ES2022+) | — | Lógica da aplicação |

> ⚠️ **Nota:** Não foram utilizadas bibliotecas de componentes React de terceiros (Material UI, React Bootstrap, etc.), conforme exigido pelo enunciado. Todos os componentes foram implementados pelos alunos.

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior recomendada)
- npm (incluído com o Node.js)

### Instalação e Execução

```bash
# 1. Clonar o repositório
git clone https://github.com/Rafael2024143044/LS-4-em-linha-Especial.git
cd LS-4-em-linha-Especial/projeto

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm start
```

A aplicação abrirá automaticamente em [http://localhost:3000](http://localhost:3000).

### Build de Produção

```bash
npm run build
```

> ⚠️ **Antes de submeter o ZIP:** Remover obrigatoriamente a pasta `node_modules` e o ficheiro `package-lock.json`.

---

## 📜 Regras do Jogo

1. O tabuleiro tem **6 linhas** e **7 colunas**.
2. O primeiro jogador e a cor da sua peça são escolhidos **aleatoriamente**.
3. Cada jogador tem **10 segundos** para efetuar a sua jogada. Se não jogar dentro do tempo, a vez passa ao adversário.
4. Para jogar, o utilizador posiciona o rato sobre a coluna pretendida e clica — a peça **desliza** até à última posição livre dessa coluna.
5. Existem **5 células especiais** (bónus), geradas aleatoriamente no início de cada partida e mantidas fixas durante a partida. Ao colocar uma peça numa célula especial, o mesmo jogador **joga novamente**.
6. O jogo termina quando:
   - Um jogador alinha **4 peças consecutivas** (horizontal, vertical ou diagonal) → **Vencedor**.
   - Não existem mais células livres → **Empate**.
7. No modo **1 vs Computador**, o computador escolhe uma coluna aleatória disponível após um pequeno atraso visual.

---

## 👥 Grupo

| Nº Aluno | Nome |
|---|---|
| 2024143044 | Rafael Marques |
| 2024152576 | Diogo Pinto |

**Unidade Curricular:** Linguagens Script 2024/2025  
**Docente:** Simão Paredes  
**Data de Entrega:** 2 de junho de 2025  

---

*DEIS · ISEC · IPC — Coimbra, 2025*
