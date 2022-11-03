var buttonNovoEvento = document.getElementById('buttonNovoEvento');
var buttonCancelar = document.getElementById('buttonCancelar');
var novoEvento = document.getElementById('novoEvento');
var formNovoEvento = document.getElementById('formNovoEvento');
var inputNomeEvento = document.getElementById('nomeEvento');
var inputDataEvento = document.getElementById('dataEvento');
var divMensagemErro = document.getElementById('mensagemErro');
var tabelaEventos = document.getElementById('tabelaEventos');

var listaEventos = [];
 //local storage

function removerEvento(event){
    var posicao = event.target.getAttribute('data-evento')
    // continuar o if depois -- if(dataEvento. < current_timestamp)
    listaEventos.splice(posicao, 1);
    atualizarTabelaEventos();
    //console.log('Remover Evento na Posição: ', + posicao);
}

function atualizarTabelaEventos(){
    console.log('Chamado Atualizar tabela eventos!')
    if(listaEventos.length == 0) {
        tabelaEventos.innerHTML = '<tr><td colspan="3">Nenhum evento</td></tr>';
        return;
    }
    tabelaEventos.innerHTML = '';
    for (var i = 0; i < listaEventos.length; i++){
        var evento = listaEventos[i];
        var linha = document.createElement('tr');
        var celulaNome = document.createElement('td');
        var celulaData = document.createElement('td');
        var celulaAcoes = document.createElement('td');
        var botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-evento', i);
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');
        botaoExcluir.addEventListener('click', removerEvento);
        celulaNome.innerHTML = evento.nome;
        celulaData.innerHTML = evento.data;
        botaoExcluir.innerText = "Remover";
        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaNome);
        linha.appendChild(celulaData);
        linha.appendChild(celulaAcoes);
        tabelaEventos.appendChild(linha);
        //aqui se adiciona os elementos
    }
}

function limparNovoEvento(){
    inputNomeEvento.value = '';
    inputDataEvento.value = '';
    inputNomeEvento.classList.remove('is-invalid');
    inputDataEvento.classList.remove('is-invalid');
    divMensagemErro.classList.add('d-none');
    divMensagemErro.innerHTML = '';
    //limpa os campos, inputs e mensgamens de erro quando cancelar evento
}

function mostrarNovoEvento() {
    novoEvento.classList.remove('d-none');
}

function ocultarNovoEvento() {
    // utilizado quando cancelar ou recarregar a pagina
    novoEvento.classList.add('d-none');
    limparNovoEvento();
}
//valida se os campos estão devidamente preenchidos
function novoEventoValido(nomeEvento, dataEvento) {
    var validacaoOk = true;
    var erro = '';
    if (nomeEvento.trim().length === 0) {
        erro = 'O nome do evento é obrigatório!';
        inputNomeEvento.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        inputNomeEvento.classList.remove('is-invalid');
    }
    var timestampEvento = Date.parse(dataEvento);
    var timestampAtual = (new Date()).getTime();
    if (isNaN(timestampEvento) || timestampEvento <= timestampAtual) {
        inputDataEvento.classList.remove('is-invalid');
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'A data do evento é obrigatória e deve estar no futuro!';
        inputDataEvento.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        inputDataEvento.classList.remove('is-invalid');
    }

    if (!validacaoOk) {
        divMensagemErro.innerHTML = erro;
        divMensagemErro.classList.remove('d-none');
    } else {
        divMensagemErro.classList.add('d-none');
    }

    return validacaoOk;
}
//retorna no console o salvamento
function salvarNovoEvento(event) {
    event.preventDefault();
    var nomeEvento = inputNomeEvento.value;
    var dataEvento = inputDataEvento.value;
    if (novoEventoValido(nomeEvento, dataEvento)) {
        console.log('Evento é válido!');
        listaEventos.push({
            nome: nomeEvento,
            data: new Date(dataEvento),
        });
        atualizarTabelaEventos();
        ocultarNovoEvento();
    } else {
        console.log('Evento é inválido!');
    }
}

buttonNovoEvento.addEventListener('click', mostrarNovoEvento);
buttonCancelar.addEventListener('click', ocultarNovoEvento);
//envio do form é como salvar
formNovoEvento.addEventListener('submit', salvarNovoEvento);
//load da janela para atualizar a tabela de eventos
window.addEventListener('load', atualizarTabelaEventos);