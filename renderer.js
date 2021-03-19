const {ipcRenderer} = require('electron')

ipcRenderer.on('data',(event,data)=>{
    console.log(JSON.parse(data))
    renderData(JSON.parse(data))
})



function renderData(data){
    document.body.innerHTML = 
`${data.TEMP}&deg;C
${data.HUM}%`
}