
const arrCartelas = []
const objCartela = {}
const log = false

let totalDeNumerosNaCartela = 0
let cartelaAtualNaTela = 0
let strNumerosMarcados = null


window.onload = () => {
    inicializarObjCartela()
    inicializarGrupoDeNumeros()
    construirCartelaMetaDados()
    atribuirEventos()
}

function $(tag){return document.getElementById(tag)}

function inicializarObjCartela(){
    objCartela.codCartela = null
    objCartela.numerosObj = {}
    objCartela.numerosArr = []
    objCartela.colB = []
    objCartela.colI = []
    objCartela.colN = []
    objCartela.colG = []
    objCartela.colO = []
    totalDeNumerosNaCartela = 0    
}

function inicializarGrupoDeNumeros () {
    const todosOsNumerosRecuperados = localStorage.getItem(`numerosDaCartela${cartelaAtualNaTela}`)
    if(todosOsNumerosRecuperados === null){
        gerarNumerosParaCartela()
    } else {
        const arrNumerosRecuperados = todosOsNumerosRecuperados.split(",")
        for (let i = 0; i < arrNumerosRecuperados.length; i++) {
            const numero = arrNumerosRecuperados[i];
            distribuirNumeros(numero)
        }
    }
}

function numerosQueEstaoMarcadosParaGuardar(){
    const arrLetras = ["B", "I", "N", "G", "O"]
    let numerosMarcados = []
    for (let i = 0; i < arrLetras.length; i++) {
        const letra = arrLetras[i];
        for (let j = 0; j < 5; j++) {
            const cpo = $(`${letra}${j}`)
            if(cpo.className === "numeroSorteado"){
                numerosMarcados.push(cpo.innerText)
            } 
        }
    }
    return numerosMarcados
}

function destacarNumerosJaMarcados(){
    limparTodasAsMarcacoes()
    const arrLetras = ["B", "I", "N", "G", "O"]
    const strNumerosMarcados = localStorage.getItem(`numerosMarcados${cartelaAtualNaTela}`)
    let numerosMarcados = ((strNumerosMarcados===null || strNumerosMarcados === "") ? null : strNumerosMarcados.split(","))
    if(numerosMarcados){
        for (let i = 0; i < arrLetras.length; i++) {
            const letra = arrLetras[i];
            for (let j = 0; j < 5; j++) {
                const cpo = $(`${letra}${j}`)
                if(numerosMarcados.indexOf(cpo.innerText) > -1){
                    cpo.className =  "numeroSorteado"
                } 
            }
        }
    }
}

function limparTodasAsMarcacoes(){
    const arrLetras = ["B", "I", "N", "G", "O"]
    for (let i = 0; i < arrLetras.length; i++) {
        const letra = arrLetras[i];
        for (let j = 0; j < 5; j++) {
            const cpo = $(`${letra}${j}`)
            cpo.className = (cpo.id === `N4`) ? "trevo" : "numeroNaoSorteado"
        }
    }
}

function gerarNumerosParaCartela(){
    inicializarObjCartela()
    numero_aleatorio(objCartela)
    function numero_aleatorio(obj) {
        while (totalDeNumerosNaCartela < 24) {
            let aleatorio = Math.floor(Math.random() * 75);
            distribuirNumeros(aleatorio)
        }
        obj.colB.sort((a, b) => a - b)
        obj.colI.sort((a, b) => a - b)
        obj.colN.sort((a, b) => a - b)
        obj.colG.sort((a, b) => a - b)
        obj.colO.sort((a, b) => a - b)
    } 
}

function construirCartelaMetaDados(){
    const dt = new Date()
    const idCartela = dt.getTime()

    alimentarObjeto("B", objCartela.colB)
    alimentarObjeto("I", objCartela.colI)
    alimentarObjeto("N", objCartela.colN)
    alimentarObjeto("G", objCartela.colG)
    alimentarObjeto("O", objCartela.colO)
    
    function alimentarObjeto (col, arr) {
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            objCartela.numerosObj[`${col}${i}`] = el
        }
    }
    
    objCartela.codCartela = idCartela
    const arrTotal = []
    objCartela.numerosArr = arrTotal.concat(objCartela.colB, objCartela.colI, objCartela.colN, objCartela.colG, objCartela.colO)
    localStorage.setItem(`numerosDaCartela${cartelaAtualNaTela}`, objCartela.numerosArr)
    
    if(log===true) console.log(`Aba:${cartelaAtualNaTela} =>`, localStorage.getItem(`numerosDaCartela${cartelaAtualNaTela}`))
    if(log===true) console.log(`NumerosMarcados:${cartelaAtualNaTela} =>`, localStorage.getItem(`numerosMarcados${cartelaAtualNaTela}`))

    construirCartelaHtml()
    destacarNumerosJaMarcados()
    
    function construirCartelaHtml(){
        alimentarObjeto("B", objCartela.colB)
        alimentarObjeto("I", objCartela.colI)
        alimentarObjeto("N", objCartela.colN)
        alimentarObjeto("G", objCartela.colG)
        alimentarObjeto("O", objCartela.colO)
        $("idCodCartela").innerHTML = new Intl.NumberFormat('pt-BR').format(parseInt(objCartela.codCartela))
        objCartela.codCartela
        function alimentarObjeto (col, arr) {
            for (let i = 0; i < arr.length; i++) {
                const el = arr[i]
                const strBtn = `${col}${i}`
                const idBnt = document.getElementById(strBtn)
                idBnt.innerHTML = el
            }
        }
    }
}

function distribuirNumeros(numeroDaVez){
    if (numeroDaVez >=1 && numeroDaVez <= 15) {
        avaliarArrayDeColuna(numeroDaVez, objCartela.colB)
    }
    if (numeroDaVez >=16 && numeroDaVez <= 30) {
        avaliarArrayDeColuna(numeroDaVez, objCartela.colI)
    }
    if (numeroDaVez >=31 && numeroDaVez <= 45) {
        if(objCartela.colN.length<4){avaliarArrayDeColuna(numeroDaVez, objCartela.colN)}
    }
    if (numeroDaVez >=46 && numeroDaVez <= 60) {
        avaliarArrayDeColuna(numeroDaVez, objCartela.colG)
    }
    if (numeroDaVez >=61 && numeroDaVez <= 75) {
        avaliarArrayDeColuna(numeroDaVez, objCartela.colO)
    }
    if (totalDeNumerosNaCartela < 24){
        return false
    }
    return true
    
    function avaliarArrayDeColuna(num, arr){
        if(arr.length < 5){
            if(arr.length == 0){
                arr.push(num)
                totalDeNumerosNaCartela++
            }else{
                if(arr.includes(num) == false){
                    arr.push(num)
                    totalDeNumerosNaCartela++
                }
            }
        }
    }
}

function atribuirEventos(){
    const arrBotoesNumericos = Object.keys(objCartela.numerosObj)
    for (let i = 0; i < arrBotoesNumericos.length; i++) {
        const strBtn = arrBotoesNumericos[i]
        const idBnt = document.getElementById(strBtn)
        idBnt.addEventListener("click", (e)=>{
            e.stopPropagation()
            e.preventDefault()
            if(idBnt.className != "numeroSorteado"){
                idBnt.className = "numeroSorteado"
            } else {
                idBnt.className = "numeroNaoSorteado"
            }
            const aux = numerosQueEstaoMarcadosParaGuardar()
            if(aux !== ""){
                localStorage.setItem(`numerosMarcados${cartelaAtualNaTela}`, aux)
            }
            if(aux.length === 0){
                localStorage.removeItem(`numerosMarcados${cartelaAtualNaTela}`)
            }
        })
    }
    $("idGerarNovosNumeros").addEventListener("click", (e)=>{
        if(confirm("Você confirma ?")){
            if(confirm("Essa ação não poderá ser desfeita !")){
                localStorage.removeItem(`numerosMarcados${cartelaAtualNaTela}`)
                gerarNumerosParaCartela()
                construirCartelaMetaDados()
                $("idGerarNovosNumeros").disabled = true
                setTimeout(()=>{
                    $("idGerarNovosNumeros").disabled = false
                },1000)
            }
        }
    })
    $("btnCartela1").addEventListener("click", (e)=>{
        e.preventDefault()
        cartelaAtualNaTela = 0
        inicializarObjCartela()
        inicializarGrupoDeNumeros()
        construirCartelaMetaDados()
        $("btnCartela1").className = "menuButtonAtivado"
        $("btnCartela2").className = "menuButtonDesativado"
        $("btnCartela3").className = "menuButtonDesativado"
        $("btnCartela4").className = "menuButtonDesativado"
    })
    $("btnCartela2").addEventListener("click", (e)=>{
        e.preventDefault()
        cartelaAtualNaTela = 1
        inicializarObjCartela()
        inicializarGrupoDeNumeros()
        construirCartelaMetaDados()
        $("btnCartela1").className = "menuButtonDesativado"
        $("btnCartela2").className = "menuButtonAtivado"
        $("btnCartela3").className = "menuButtonDesativado"
        $("btnCartela4").className = "menuButtonDesativado"
    })
    $("btnCartela3").addEventListener("click", (e)=>{
        e.preventDefault()
        cartelaAtualNaTela = 2
        inicializarObjCartela()
        inicializarGrupoDeNumeros()
        construirCartelaMetaDados()
        $("btnCartela1").className = "menuButtonDesativado"
        $("btnCartela2").className = "menuButtonDesativado"
        $("btnCartela3").className = "menuButtonAtivado"
        $("btnCartela4").className = "menuButtonDesativado"
    })
    $("btnCartela4").addEventListener("click", (e)=>{
        e.preventDefault()
        cartelaAtualNaTela = 3
        inicializarObjCartela()
        inicializarGrupoDeNumeros()
        construirCartelaMetaDados()
        $("btnCartela1").className = "menuButtonDesativado"
        $("btnCartela2").className = "menuButtonDesativado"
        $("btnCartela3").className = "menuButtonDesativado"
        $("btnCartela4").className = "menuButtonAtivado"
    })
}