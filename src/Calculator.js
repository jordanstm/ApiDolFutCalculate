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
    let DolFutFECHAMENTO =0;
    await ValorFechamentoDolarAnterior().then(
      (Result)=>{ DolFutFECHAMENTO= Result})
    const DolComTaxa =  DolFutFECHAMENTO * Taxa;
    const DELTA = DolComTaxa- DolFutFECHAMENTO; //falta ajustar a função MArred
    const Abertura = DolFutFECHAMENTO + DELTA;
    const Minima = Abertura - DELTA;
    const Maxima = Abertura + DELTA;

    let dados=[];
    dados.push({Fechaento:DolFutFECHAMENTO,Abertura:Abertura,Minima:Minima,Maxima:Maxima}) 
     return dados;
  }
  export default CalculaValores