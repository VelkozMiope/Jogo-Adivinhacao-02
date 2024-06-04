let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

function exibirMensagemInicial(){
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
};

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite) listaNumerosSorteados = [];

    if (listaNumerosSorteados.includes(numeroEscolhido)) return gerarNumeroAleatorio() 
    else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
};

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
};

function verificarChute() {
    let chute = document.querySelector('input').value;
    tentativas++;
    if (chute == numeroSecreto) {
        let textoTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número ${numeroSecreto} em ${tentativas} ${textoTentativa}!`
        exibirTexto('h1', 'Parabéns!');
        exibirTexto('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) exibirTexto('p', 'O número secreto é maior!');
        
        else exibirTexto('p', 'O número secreto é menor!');
    }
    limparCampo();
};

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
};

exibirMensagemInicial();