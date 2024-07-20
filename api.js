//1como chamaar uma APi
//2 *traduzir* a resposta da API
//3 trabalhar com os dados de API

//CHAMAR A API
//AJAX => ANTIGA E NÃO DEVE SER USADO CÓDIGO NOVOS.
//FETCH => 2015 +.
//AXIOS => MAIS MODERNO, PORÉM DEPENDE DE UMA BIBLIOTECA EXTERNO. 
let respostaApi;
let dadosApi;

const cep = document.querySelector("#cep")
const rua = document.querySelector("#rua")
const estado = document.querySelector("#uf")
const bairro = document.querySelector("#bairro")
const cidade = document.querySelector("#cidade")
const complemento = document.querySelector("#comp")
const roda = document.querySelector(".loader")

const todoForm = [cep, rua, uf, bairro, cidade, comp]

//metodos do fetch para ler os dados da API


function buscaCep(cep){
fetch(`https://viacep.com.br/ws/${cep}/json/`)
.then((resposta) =>{
console.log(resposta)
roda.style.display = "block"
respostaApi = resposta.json()
desabilitarForms()

return respostaApi

})
.then(dados => {
    console.log(dados)
    dadosApi = dados
    setTimeout(() => {
        preencherForms(dadosApi)
        roda.style.display = "none"
        habilitarForm()
    }, 2000) //call back
})

}


function preencherForms (dadosApi) {
    rua.value = dadosApi.logradouro
    estado.value = dadosApi.uf
    bairro.value = dadosApi.bairro
    cidade.value = dadosApi.localidade
    comp.value = dadosApi.complemento
}

function desabilitarForms() {
    for (const input of todoForm) {
        input.disabled = true
    }
    
}

function habilitarForm() {
    for (const input of todoForm) {
        input.disabled = false
    }
    
}


cep.addEventListener("keydown", (e)=> {
    if (e.key === "Enter") {                        // call back
        buscaCep(cep.value)
    }
})

