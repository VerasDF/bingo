const idTabuleiro = document.getElementById("idTabuleiro")
const idCartela = document.getElementById("idCartela")

window.addEventListener("load", ()=>{
    idTabuleiro.addEventListener("click", (e)=>{
        e.preventDefault()
        window.location.replace("./tabuleiro")
    })
    idCartela.addEventListener("click", (e)=>{
        e.preventDefault()
        window.location.replace("./cartela")
    })
})
