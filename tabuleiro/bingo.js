const arrHistorico = []

let timeOut = null
let timerAutomatico = null
let numeroSorteado = null
let numerosRestantes = 75

const objTabuleiro = {
    B:{
        B1:{sorteada: false},
        B2:{sorteada: false},
        B3:{sorteada: false},
        B4:{sorteada: false},
        B5:{sorteada: false},
        B6:{sorteada: false},
        B7:{sorteada: false},
        B8:{sorteada: false},
        B9:{sorteada: false},
        B10:{sorteada: false},
        B11:{sorteada: false},
        B12:{sorteada: false},
        B13:{sorteada: false},
        B14:{sorteada: false},
        B15:{sorteada: false}
    },
    I:{
        I16:{sorteada: false},
        I17:{sorteada: false},
        I18:{sorteada: false},
        I19:{sorteada: false},
        I20:{sorteada: false},
        I21:{sorteada: false},
        I22:{sorteada: false},
        I23:{sorteada: false},
        I24:{sorteada: false},
        I25:{sorteada: false},
        I26:{sorteada: false},
        I27:{sorteada: false},
        I28:{sorteada: false},
        I29:{sorteada: false},
        I30:{sorteada: false}
    },
    N:{
        N31:{sorteada: false},
        N32:{sorteada: false},
        N33:{sorteada: false},
        N34:{sorteada: false},
        N35:{sorteada: false},
        N36:{sorteada: false},
        N37:{sorteada: false},
        N38:{sorteada: false},
        N39:{sorteada: false},
        N40:{sorteada: false},
        N41:{sorteada: false},
        N42:{sorteada: false},
        N43:{sorteada: false},
        N44:{sorteada: false},
        N45:{sorteada: false}
    },
    G:{
        G46:{sorteada: false},
        G47:{sorteada: false},
        G48:{sorteada: false},
        G49:{sorteada: false},
        G50:{sorteada: false},
        G51:{sorteada: false},
        G52:{sorteada: false},
        G53:{sorteada: false},
        G54:{sorteada: false},
        G55:{sorteada: false},
        G56:{sorteada: false},
        G57:{sorteada: false},
        G58:{sorteada: false},
        G59:{sorteada: false},
        G60:{sorteada: false}
    },
    O:{
        O61:{sorteada: false},
        O62:{sorteada: false},
        O63:{sorteada: false},
        O64:{sorteada: false},
        O65:{sorteada: false},
        O66:{sorteada: false},
        O67:{sorteada: false},
        O68:{sorteada: false},
        O69:{sorteada: false},
        O70:{sorteada: false},
        O71:{sorteada: false},
        O72:{sorteada: false},
        O73:{sorteada: false},
        O74:{sorteada: false},
        O75:{sorteada: false}
    }
}

const automatico = () => {
    const intervalo = parseInt(document.getElementById("ranIntervalo").value)
    timerAutomatico = setTimeout(()=>{
        sortearNumero()
        if (numerosRestantes > 2){
            automatico()
        } else if (numerosRestantes == 2){
            const chkAutomatico = document.getElementById("chkAutomatico")
            chkAutomatico.checked = false
            chkAutomatico.disabled = true
        }
    },intervalo)
}

window.onload = () => {
    const btnSortearNumero = document.getElementById("btnSortearNumero")
    btnSortearNumero.addEventListener("click",()=>{
        timeOut = setTimeout(() => {
            document.getElementById("btnSortearNumero").disabled = false
            document.getElementById("divNumeroSorteado").className = "numeroSorteadoPrincipal"
        }, 2000);
        document.getElementById("divNumeroSorteado").className = "numeroSorteadoPrincipalDestaque"
        btnSortearNumero.disabled = true
        sortearNumero()
    })
    const chkAutomatico = document.getElementById("chkAutomatico")
    chkAutomatico.addEventListener("click",()=>{
        if(chkAutomatico.checked == true){
            automatico()
        }else{
            clearTimeout(timerAutomatico)
        }
    })
    const btnMenuSorteio = document.getElementById("btnMenuSorteio")
    btnMenuSorteio.addEventListener("click", (e)=>{
        e.preventDefault()
        alternarMenu()
    })
    const btnMenuHistorico = document.getElementById("btnMenuHistorico")
    btnMenuHistorico.addEventListener("click", (e)=>{
        e.preventDefault()
        alternarMenu()
    })
}

function alternarMenu(){
    const btnMenuSorteio = document.getElementById("btnMenuSorteio")
    const btnMenuHistorico = document.getElementById("btnMenuHistorico")
    // const divResultado = document.getElementById("divResultado")
    const divHistorico = document.getElementById("divHistorico")
    btnMenuSorteio.classList.toggle("transition1")
    btnMenuHistorico.classList.toggle("transition2")
    divHistorico.classList.toggle("transition3")
}

const construirHistorico = (numeroSorteado) => {
    const objHistorico = {
        hora: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        numero: numeroSorteado
    }
    
    arrHistorico.push(objHistorico)
    document.getElementById("divNumeroSorteado").innerHTML = numeroSorteado
    const divHistorico = document.getElementById("divHistorico")
    let aux = ""
    arrHistorico.forEach((item) => {
        aux += `<label style="font-size: 10px">${item.hora}</label> &raquo; <label class="destacarNumeroHistorico">${item.numero}</label> `
    })
    divHistorico.innerHTML = aux
    document.getElementById("divHistorico").scrollTop = 5000
}

const sortearNumero = () => {
    const marcarTabela = (numeroSorteado) => {
        const arrNumeroAux = numeroSorteado.split(" - ")
        const letraAux = arrNumeroAux[0]
        const numeroAux = arrNumeroAux[1]
        const itemAux = `${letraAux}${numeroAux}`
        const posicaoNaTabela = document.getElementById(itemAux)
        if(posicaoNaTabela){
            posicaoNaTabela.className = "numeroSorteado"
        }
    }

    numeroSorteado = Math.floor(Math.random() * 75) + 1
    
    if (numeroSorteado >=1 && numeroSorteado <= 15) {numeroSorteado = `B - ${numeroSorteado}`    }
    if (numeroSorteado >=16 && numeroSorteado <= 30) {numeroSorteado = `I - ${numeroSorteado}`    }
    if (numeroSorteado >=31 && numeroSorteado <= 45) {numeroSorteado = `N - ${numeroSorteado}`    }
    if (numeroSorteado >=46 && numeroSorteado <= 60) {numeroSorteado = `G - ${numeroSorteado}`    }
    if (numeroSorteado >=61 && numeroSorteado <= 75) {numeroSorteado = `O - ${numeroSorteado}`    }

    if(numerosRestantes > 0){
        if(verificarSeNumeroJaFoiSorteado(numeroSorteado)){
            sortearNumero()
        }else{
            numerosRestantes--
            marcarTabela(numeroSorteado)
            document.getElementById("lblNumerosRestantes").innerHTML = `Restam ${numerosRestantes} numeros a serem sorteados`
            construirHistorico(numeroSorteado);
        }
    }
    
    if (numerosRestantes == 1){
        const strTextoAcabou = `Resta apenas ${numerosRestantes} numero a serem sorteado`
        document.getElementById("lblNumerosRestantes").innerHTML = strTextoAcabou
    }

    if (numerosRestantes == 0){
        const strTextoAcabou = "Não há mais números a serem sorteados!"
        document.getElementById("lblNumerosRestantes").innerHTML = strTextoAcabou
    }
    
}

const verificarSeNumeroJaFoiSorteado = (numero) => {
    const arrNumeroAux = numero.split(" - ")
    const letraAux = arrNumeroAux[0]
    const numeroAux = arrNumeroAux[1]
    const itemAux = `${letraAux}${numeroAux}`
    if(objTabuleiro[letraAux][itemAux].sorteada){
        return true
    }else{
        objTabuleiro[letraAux][itemAux].sorteada = true
    }
    return false
}
