import axios from 'axios';
import * as  cheerio from 'cheerio'

 const url ='https://www.bcb.gov.br/'//Taxa de juros Brasil
 const urlDolarAntes='https://br.investing.com/currencies/usd-brl-historical-data'

 export async function buscaJuros(){
   let Juro = await  axios(url)
    .then((rep)=>{
        const html = rep.data ;
         const $ = cheerio.load(html);
         const Juros = $('.percentual').text    
         console.log ('o  Juro e,',Juros);
         return Juros;
    })
     return Juro/100;
 }
 export async function ValorFechamentoDolarAnterior(){
        let DolAntes =  await  axios(url)
        .then((rep)=>{
            const html = resp.data ;
            $ = cheerio.load(html);
             const Juros = $('.trading-hours_value__1aTHe')    
             console.log ('o  Juro e,',Juros);
             return Juros;
        })
         return DolAntes;
 }
 export default buscaJuros;