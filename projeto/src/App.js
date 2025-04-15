import { useState } from 'react';
import './assets/styles/App.css'
import MenuSelecaoJogo from './components/popUpMenuInicial/menuSelecao'
import IntroduzirPlayers from './components/Jogo1vs1/InsercaoNomes/InserirNomesPls'
import JogoPlvsComp from './components/Jogo1vsComp/Jogo/main1vsComp'

function App() {

  const [started, setStarted] = useState(0); /* estado incial (jogo nao iniciado)*/
  // 0 - jogo nao inciado
  // 1 - jogo 1vs1 
  // 2 - jogo 1 vs computador
  
  const startGamePlvsPl = () => {
    setStarted(1);
  }

  const startGamePlvsCmp = () => {
    setStarted(2);
  }

  return (
    <div className="App">
     {started === 0 && (
      <MenuSelecaoJogo
        startGamePlvsPl={startGamePlvsPl}
        startGamePlvsCmp={startGamePlvsCmp}
      />
    )}
    {started === 1 && (
      <IntroduzirPlayers voltarAoMenu={() => setStarted(0)}/>
    )}
    {started === 2 && (
      <JogoPlvsComp voltarAoMenu={() => setStarted(0)}/>
    )}
    </div>
  );
}

export default App;
