let fullData = null

window.onload = () => {
    const httpAjax = new XMLHttpRequest()
    const url = `https://jsonplaceholder.typicode.com/posts`
    httpAjax.open( 'GET' , url )
    // request.responseText = 'json'
    httpAjax.responseText = 'text'
    httpAjax.send()
    httpAjax.onload = () => {
        fullData = httpAjax.response
        // fullData = JSON.parse( fullData )
    }
}

let controle = 75
const numerosSorteados = []
const divDestaque = document.getElementById("divDestaque")
const divHistorico = document.getElementById("divHistorico")
const divMensagem = document.getElementById("divMensagem")
const btnSortearNumero = document.getElementById("btnSortearNumero")
btnSortearNumero.addEventListener("click", (e)=>{ sortearNumero() })

function sortearNumero(){
    if (numerosSorteados.length === 75) {return}
    let numeroSorteado = null
    do {
        numeroSorteado = Math.floor(Math.random() * 75) + 1
        numero = document.getElementById(`div${numeroSorteado}`)
        
    } while (numero.className !== "numeroNaoSorteado" && numerosSorteados.length < 75)
    controle--
    numeroSorteado = determinarLetra(numeroSorteado)
    divDestaque.innerHTML = `${numeroSorteado.letra}-${numeroSorteado.numero}`
    numerosSorteados.push(numeroSorteado)
    produzirHistorico()
    destacar()
    
    if(numero.className === "numeroNaoSorteado"){
        numero.classList.toggle("numeroSorteado")
    }
}

function produzirHistorico(){
    let aux = ""
    numerosSorteados.forEach((item)=>{
        aux += `<div class="divOrdemNumeroSorteado">${item.letra}-${item.numero}</div>`
    })
    if(controle > 0) {
        divMensagem.innerHTML = (controle < 2 ? `Resta apenas 1 número a ser sorteado!` : `Restam ${controle} números a serem sorteados`)
    }
    else {
        divMensagem.innerHTML = `Não há mais números a ser sorteado!`
    }
    divHistorico.innerHTML = aux
}

function destacar(){
    btnSortearNumero.disabled = true
    divDestaque.classList.toggle("destacar")
    setTimeout(()=>{
        divDestaque.classList.toggle("destacar")
        btnSortearNumero.disabled = false
    },3000)
}

function determinarLetra(num){
    if(num <= 15){ return {letra: "B", numero:num}}
    if(num > 15 && num <=30){ return {letra: "I", numero:num}}
    if(num > 30 && num <=45){ return {letra: "N", numero:num}}
    if(num > 45 && num <=60){ return {letra: "G", numero:num}}
    if(num > 60 && num <=75){ return {letra: "O", numero:num}}
}