const axios = require('axios')
const spawn = require("child_process").spawn

const url = 'https://cdn.jsdelivr.net/gh/apilayer/restcountries@3dc0fb110cd97bce9ddf27b3e8e1f7fbe115dc3c/src/main/resources/countriesV2.json'
const names = []
const limit = 37657145

async function fetch(){
    const res = await axios(url)
    const data = await res.data
    data.map(item=>{
        if(item.population>=limit)
            names.push(item.name)
    })
}

fetch().then(()=>{
    const process = spawn('python',["./geocode.py", JSON.stringify(names)])
    process.stdout.on('data', data => console.log(data.toString()))
})
