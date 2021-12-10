const axios = require('axios')
let D = []
const r = 180/Math.PI

async function fetch(){
    const res = await axios('https://cdn.jsdelivr.net/gh/apilayer/restcountries@3dc0fb110cd97bce9ddf27b3e8e1f7fbe115dc3c/src/main/resources/countriesV2.json')
    res.data.map( d => d.population>=84497 && D.push([d.latlng[0]/r,d.latlng[1]/r]) )
}
fetch().then(()=>{
    let sum = 0
    for(let i = 0; i<20; i++)
        for(let j = i+1; j<20; j++){
            const calc = Math.sin((D[j][0]-D[i][0])/2)**2 
                + Math.cos(D[i][0]) * Math.cos(D[j][0])
                * Math.sin((D[j][1]-D[i][1])/2)**2
            let distance = 2 * 6731 * Math.asin(Math.sqrt(calc))
            distance = Math.round(distance * 1e2)/1e2
            sum += distance
        }
    console.log(Math.round(sum * 1e2)/1e2)
})
