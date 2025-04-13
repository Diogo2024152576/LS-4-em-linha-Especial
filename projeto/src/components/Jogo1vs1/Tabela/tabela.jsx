import './tabela.css'
import { linhas, colunas } from '../../../constants/constants';
   
export default function Tabela() {
    const tabela = 
        new Array(linhas)
        .fill()
        .map(_ => new Array(colunas).fill(''))
    return <div className='tabela'> 
        {tabela.map((linhas, i) => 
            linhas.map((colunas, j) => <div key={i+'-'+j}/>)
        )}
    </div>
}