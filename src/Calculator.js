import getUtilDays from './crawler/CalculaDiasUteis.js'
import {buscaJuros,ValorFechamentoDolarAnterior} from './crawler/Crawler.js';



 function Marred(val,Mult){
     return Math.ceil(val/Mult)* Mult
 }

   export async function CalculaValores(){
    const Dat = new Date();
    const Euller = 2.71828;
    const Juros = await buscaJuros().then(r=>{ return r});
    const DiasVenc = getUtilDays(Dat.getMonth(),Dat.getFullYear());
    const Tempo = (1/252) * DiasVenc;
    const Potencia = Juros * Tempo;
    const Taxa =  Math.pow(Euller,Potencia);
    const DolFutFECHAMENTO = ValorFechamentoDolarAnterior().then((Result)=>{ return Result})
    const DolComTaxa =  DolFutFECHAMENTO * Taxa;
    const DELTA = Marred(DolComTaxa- DolFutFECHAMENTO,0.5);
    const Maxima = DolFutFECHAMENTO + DELTA;
    const Minima = DolFutFECHAMENTO - DELTA;

    let dados=[];
    dados.push({Maxima:Maxima,Minima:Minima}) 
  }
  export default CalculaValores