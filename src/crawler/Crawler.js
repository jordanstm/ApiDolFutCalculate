import puppeteer from 'puppeteer-extra';
import {executablePath} from 'puppeteer';
import StealthPlugin  from 'puppeteer-extra-plugin-stealth';
import * as  cheerio from 'cheerio'
import axios from 'axios'
 const url ='https://www.bcb.gov.br/'//Taxa de juros Brasil
 const urlDolarAntes='https://br.investing.com/currencies/usd-brl-historical-data'

 var Browser = undefined;
 async  function PuppeterLaunch(){
     
    let Path =  await executablePath();
    let Juro =0; 
    let valores=[]
    
    puppeteer.use(StealthPlugin());
 
     Browser= await puppeteer.launch(
     {
       args: ['--no-sandbox',],
       headless: true,
       ignoreHTTPSErrors: true,
   
       // add this
       executablePath:Path ,
     }
    );  
   
    const page = await Browser.newPage();
     return page;

  }
 export async function buscaJuros(){
  let Juro =0; 
  let valores=[]

 await PuppeterLaunch().then(
    async(page)=> {

      await page.goto(url);
      
      let elements = await page.$$('div.percentual');
   
      for (let elem of elements){
        valores.push (await  page.evaluate( el =>
              el.innerHTML.replace('%','').replace(',','.'),elem
          ));
        }
        page.close();
    }
  )
  ;
  
 
   Juro = parseFloat(valores[1])
   Browser.close();
   Browser = undefined;
     return Juro/100;
    
 }

 export async function ValorFechamentoDolarAnterior(){
        let DolAntes =  0;
         if(Browser === undefined){
          await PuppeterLaunch() 
          .then(async(page)=>{
  

              
               await page.goto(urlDolarAntes);//<div class="trading-hours_value__1aTHe" data-test="prev-close-value">4,862</div>
        
                let elements = await page.$$('div.trading-hours_value__1aTHe').innerHTML.replace(',','.');
                return parseFloat(elements)
          })


         }

         else 
         {
              let page = await Browser.newPage();
              await page.goto(urlDolarAntes);
              let elements = await page.$$('span.text-2xl');
         }
        
 }
 export default buscaJuros;





//  import {createRequire} from "module"; 
// const require = createRequire(import.meta.url);  
// const puppeteer = require('puppeteer-extra'); 
// const hidden = require('puppeteer-extra-plugin-stealth')  

// // require executablePath from puppeteer 
// //const {executablePath} = require('puppeteer')  

// async function test () {   
//     // Launch sequence  
//     puppeteer.use(hidden())  
//     const browser = await puppeteer.launch({  
//         args: ['--no-sandbox',],  
//         headless: false,  
//         ignoreHTTPSErrors: true,   
//         // add this  
//         executablePath: executablePath(),  
//     })   
//     const page = await browser.newPage()  
//     await page.setViewport({  
//         width: 1920,  
//         height: 1280,  
//         deviceScaleFactor: 1,  
//     });   
//     // Go to page  
//     await page.goto('[6](https://google.com/)', {  
//         waitUntil: 'networkidle0',  
//     }); 
// }
