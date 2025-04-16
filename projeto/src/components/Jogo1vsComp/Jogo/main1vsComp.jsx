import sairImage from '../../../assets/images/sair_b.png';
import './main1vsComp.css'
import { useState } from 'react';

export default function JogoPlvsComp({ voltarAoMenu }) {
    //para comp vs player
    const [winner, setWinner] = useState(0); 

    return (
      <div className='jogo-main'>
        <div className='jogo'>
          <div className='header-1vscomp'>
            <div className='jogadores'>
              <div className='player'>
                <div className='circulo_esq'></div>
                  <div className='ct-nome-tempo'>
                    <p>Player 1</p>
                    <p id="tempo">00:00</p>
                  </div>
                </div>
              <div className='txt'>
              <p>4 em linha vs Computador</p>
              </div>
              <div className='comp'>
                <div className='ct-nome-tempo'>
                  <p>Computador</p>
                  <p id="tempo">00:10</p>
                </div>
                <div className='circulo_dir'></div>
              </div>
            </div>
          </div>
          
        </div>
        <div className='sair' onClick={voltarAoMenu}>
          <button id="sair">
            <img src={sairImage} alt="Voltar ao menu"/>
          </button>
          <p>Sair do Jogo</p>
        </div>
      </div>
    );
  }
  