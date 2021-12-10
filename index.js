const axios = require('axios')

const url = 'https://cdn.jsdelivr.net/gh/apilayer/restcountries@3dc0fb110cd97bce9ddf27b3e8e1f7fbe115dc3c/src/main/resources/countriesV2.json'
const points = []
const limit = 11750
const radius = 6731 // km

async function fetch(){
    const res = await axios(url)
    const data = await res.data
    data.map(item=>{
        if(item.population>=limit)
            points.push(item.latlng) // -> [[latitude,longitude]]
    })
}
fetch().then(()=>{
    const toRad = points.map(item=>{
        return[
            item[0]/(180/Math.PI),
            item[1]/(180/Math.PI)
        ]
    })
    const l = toRad.length

    function findDistance(){
        for(let i = 0; i<l; i++){
            for(let j = i+1; j<l; j++){
                //---- Haversine_formula ----
                const calc = Math.pow(Math.sin((toRad[j][0]-toRad[i][0])/2),2)  
                    + Math.cos(toRad[i][0]) * Math.cos(toRad[j][0])
                    * Math.pow(Math.sin((toRad[j][1]-toRad[i][1])/2),2)

                let Distance = 2 * radius * Math.asin(Math.sqrt(calc))
                Distance = Distance.toFixed(2)

                return `${Distance} km`
            }
        }
    }
    // console.log(points)
    // console.log(toRad)
    console.log(findDistance())
})
