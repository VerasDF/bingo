const idTabuleiro1 = document.getElementById("idTabuleiro1")
const idTabuleiro2 = document.getElementById("idTabuleiro2")
const idCartela = document.getElementById("idCartela")

window.addEventListener("load", ()=>{
    idTabuleiro1.addEventListener("click", (e)=>{
        e.preventDefault()
        window.location.href="./tabuleiro1/index.html"
    })
    idTabuleiro2.addEventListener("click", (e)=>{
        e.preventDefault()
        window.location.href="./tabuleiro2/index.html"
    })
    idCartela.addEventListener("click", (e)=>{
        e.preventDefault()
        window.location.href="./cartela/index.html"
    })
})
