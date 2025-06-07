let numerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function modificarHTML(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Abaixo possuímos uma linha de código que ativa o modo locutor do programa. Caso queria ativar, remova as duas barrinhas ("//")
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function valorMaximo() {
    return 10; // Troque o valor pelo que você deseja que seja o máximo durante a execução do jogo
}

function aberturaJogo() {
    modificarHTML('h1', 'Bem vindo ao jogo do número secreto!');
    modificarHTML('p', `Escolha um número entre 1 e ${valorMaximo()}`);
}

aberturaJogo();

function verificarChute() {
    let chute = document.querySelector('input').value;
    // Linha do console que apenas mostra um True ou False dependendo do valor inserido. Nada demais para ser sincero.
    // console.log(chute == numeroSecreto);
    let maiormenor = chute > numeroSecreto ? 'menor' : 'maior';
    let sintaxe = tentativas > 1 ? 'tentativas' : 'tentativa';

    if (chute == numeroSecreto) {
        modificarHTML('h1', 'Acertou!');
        modificarHTML('p', `Você acertou com ${tentativas} ${sintaxe}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        tentativas ++;
        let exibirDica = `O número secreto é ${maiormenor}`;
        modificarHTML('p', exibirDica);
        limparCampo();
        }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * valorMaximo() + 1);
    let estouroDaLista = numerosSorteados.length;

    // Limpa a lista para que seja possível recomeçar o jogo sem o erro de limite estourado
    if (estouroDaLista == valorMaximo()) {
        numerosSorteados = [];
    }


    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        // Abaixo possuímos uma "colinha" do número secreto que foi sorteado. Ativar somente em fase de testes
        // console.log(numerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    aberturaJogo();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
