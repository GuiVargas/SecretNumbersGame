let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);

let tentativas = 1;

/* Função para definir o que será substituído de forma estruturada*/
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

/* Função para exibição da mensagem inicial */
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e 10`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    // console.log(chute == numeroSecreto); // Exibe no console se o numero imputado é igual ao número secreto gerado

    if (chute == numeroSecreto) {
        /*Atribui a palavra "tentatva" para o plural caso tenha chutado mais de 1 vez*/
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

        /*Cria uma variável com o texto de vitória no singular ou plural*/
        let mensagemTentativa = `Isso ai!\nO número secreto era ${numeroSecreto}.\nVocê descobriu ele com ${tentativas} ${palavraTentativa}.`;

        exibirTextoNaTela('h1', 'ACERTOU!');
        exibirTextoNaTela('p', mensagemTentativa);

        /* Habilita botão "NOVO JOGO"*/
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            /*Cria uma variável com o texto indicando o número menor*/
            let mensagemNumeroMenor = `Tente novamente!\n O número secreto é menor que ${chute}!`;
            exibirTextoNaTela('p', mensagemNumeroMenor);
        } else {
            /*Cria uma variável com o texto indicando o número maior*/
            let mensagemNumeroMaior = `Tente novamente!\n O número secreto é maior que ${chute}!`;
            exibirTextoNaTela('p', mensagemNumeroMaior);
        }
        tentativas++;
        limparCampo();
    }
}
/* Função pra gerar o número aleatório */
function gerarNumeroAleatorio() {
    numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementos = listaDeNumerosSorteados.length;

    if (quantidadeDeElementos == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

/* Função para resetar os valor imputados*/
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
/* Função para reiniciar um novo jogo resetando e substituindo as informações do jogoanterior */

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Cria um novo nº secreto
    console.log(numeroSecreto);
    limparCampo();
    tentativas = 1; // Volta as tentativas para 1
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão "NOVO JOGO" novamente
}
