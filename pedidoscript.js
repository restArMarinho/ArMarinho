var formaDePagamento = "";
var formaDeEntrega = ""; 
var frutosDoMaroutput = "";
var pescadooutput = "";
var arrozoutput = "";
var massasoutput = "";
var saladaoutput = "";
var valortotal = 0;
var Aux = 0;
var Aux2 = 0;
var counter = 0;
var frutosdomarPorcoes = [];
var opcoes = document.getElementsByName("formadeentrega");
/****************************************Navegação*******************************************************************************/

/****************************************Navegação*******************************************************************************/

function voltarParaIndex(){
    window.location.href = 'index.html';

}

function pedido(){
    
    document.documentElement.scrollTop = 0;
    
    fazerPedido(AbrirJanela,"resumo", "conteiner");
    calculaValorTotal();

}
function confirmaPedido(){
    fazerPedido(enviarPedido)
}
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
function AbrirJanela(janelaAbrir, janelaFechar) {
       
    document.getElementById(janelaFechar).style.display = 'none';
    document.getElementById(janelaAbrir).style.display = 'block';
   
}
/****************************************Navegação*******************************************************************************/

/****************************************organizado por ordem de execulção no prgrama********************************************/


function limitarSelecoes(checkbox) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="' + checkbox.name + '"]:checked');
    var selects = document.querySelectorAll('select[name="' + checkbox.name + '"]');
    var uncheckedCheckboxes = document.querySelectorAll('input[type="checkbox"][name="' + checkbox.name + '"]:not(:checked)');
    var radios = document.querySelectorAll('input[type="radio"][name="' + checkbox.name + '"]:checked');
    var uncheckedradios = document.querySelectorAll('input[type="radio"][name="' + checkbox.name + '"]:not(:checked)');
    var select = checkbox.parentNode.querySelector('select');
    // Desabilita o select se o checkbox não estiver marcado
    select.disabled = !checkbox.checked;

    // Desmarca todas as entradas de rádio selecionadas
    radios.forEach(function(radio) {
        radio.checked = false;
    });
    // Se mais de um checkbox estiver marcado, desabilita os outros checkboxes não marcados
    if (checkboxes.length > 1) {
        uncheckedCheckboxes.forEach(function(uncheckedCheckbox) {
            uncheckedCheckbox.disabled = true;
        });
        // Desabilita todos os selects
        selects.forEach(function(select) {
            select.disabled = true;
        });

    } else {
        // Se apenas um checkbox estiver marcado, habilita os outros checkboxes não marcados
        uncheckedCheckboxes.forEach(function(uncheckedCheckbox) {
            uncheckedCheckbox.disabled = false;
        });
        if(checkboxes.length > 0){
        // Habilita o select correspondente ao checkbox marcado
        var lastCheckedSelect = checkboxes[checkboxes.length - 1].parentNode.querySelector('select');
        lastCheckedSelect.disabled = false;
        }
    }
    if(checkboxes.length === 0){
        // Verifica se há radios e seleciona o primeiro se nenhum checkbox estiver marcado
        
        uncheckedradios[0].checked = true; 
        
    }
    //console.log(checkboxes.length, uncheckedradios);
   
    calculaValorTotal();
}

function deselecionarCheckbox(checkbox) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="' + checkbox.name + '"]:checked');
    var uncheckedCheckboxes = document.querySelectorAll('input[type="checkbox"][name="' + checkbox.name + '"]:not(:checked)');
    var selects = document.querySelectorAll('select[name="' + checkbox.name + '"]');

    uncheckedCheckboxes.forEach(function(checkbox) {
        
        
        checkbox.disabled = false;
    });

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
        
        checkbox.disabled = false;
    });

    selects.forEach(function(select) {
        select.disabled = true;
        select.value = "x1";
    });
    calculaValorTotal();
}

function salvarPorcao(select) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="' + select.name + '"]');
    if (select.value === "x2") {
        frutosdomarPorcoes.push(select.value);
        console.log(frutosdomarPorcoes);

        // Desabilitar checkboxes não marcadas se o valor do select for "x2"
        
        checkboxes.forEach(function(cb) {
            
                cb.disabled = true;
            
        });
    }
    else{
        checkboxes.forEach(function(cb) {
        
            cb.disabled = false;
        
    });

    }
    calculaValorTotal();
}  

function fazerPedido(func, f1, f2) {
    let contador = 0;

    var form = document.getElementById("frutosDoMar");

    // Captura o valor do input checkbox selecionado
    var checkboxesSelecionados = form.querySelectorAll('input[type="checkbox"]:checked');

    // Captura o valor do input radio selecionado
    var radioSelecionado = form.querySelector('input[type="radio"]:checked');

    // Captura o valor do select
    var selectValue = form.querySelector('select[name="pedido_prato1"]').value;

    // Verifica se alguma checkbox foi selecionada
    if (checkboxesSelecionados.length > 0) {
        // Se sim, crie uma array para armazenar os valores
        var frutosDoMar = [];
        checkboxesSelecionados.forEach(function (checkbox) {
            frutosDoMar.push(checkbox.value);
        });
        frutosDoMaroutput = "MARISCO: " + frutosDoMar.join(", ") +" "+ selectValue;
        
    }
    
    else if (radioSelecionado !== null) {
        frutosDoMaroutput = "MARISCO: " + radioSelecionado.value;
    }
    
    // Verifica se algum input radio foi selecionado
    else if (radioSelecionado !== null) {
        frutosDoMaroutput = "MARISCO: " + radioSelecionado.value;
    }
   
    // Caso nenhum elemento seja selecionado
    else {
        alert("Nenhuma opção de MARISCO selecionada.");
        contador++;
    }

    /***************************************************************************************************************************** */
    
    var form = document.getElementById("pescado");

    // Captura o valor do input checkbox selecionado
    var checkboxesSelecionados = form.querySelectorAll('input[type="checkbox"]:checked');

    // Captura o valor do input radio selecionado
    var radioSelecionado = form.querySelector('input[type="radio"]:checked');

    // Captura o valor do select
    var selectValue = form.querySelector('select[name="pedido_prato2"]').value;

    // Verifica se alguma checkbox foi selecionada
    if (checkboxesSelecionados.length > 0) {
        // Se sim, crie uma array para armazenar os valores
        var pescado = [];
        checkboxesSelecionados.forEach(function (checkbox) {
            pescado.push(checkbox.value);
        });
        pescadooutput = "PEIXE: " + pescado.join(", ") +" "+ selectValue;;
    }
    // Verifica se algum input radio foi selecionado
    else if (radioSelecionado !== null) {
        pescadooutput = "PEIXE: " + radioSelecionado.value;
    }
    
    // Caso nenhum elemento seja selecionado
    else {
        alert("Nenhuma opção de PEIXE selecionada.");
        contador++;
    }
    /***************************************************************************************************************** */
    
    var form = document.getElementById("arroz");

    // Captura o valor do input checkbox selecionado
    var checkboxesSelecionados = form.querySelectorAll('input[type="checkbox"]:checked');

    // Captura o valor do input radio selecionado
    var radioSelecionado = form.querySelector('input[type="radio"]:checked');

    // Captura o valor do select
    var selectValue = form.querySelector('select[name="pedido_prato3"]').value;

    // Verifica se alguma checkbox foi selecionada
    if (checkboxesSelecionados.length > 0) {
        // Se sim, crie uma array para armazenar os valores
        var arroz = [];
        checkboxesSelecionados.forEach(function (checkbox) {
            arroz.push(checkbox.value);
        });
        arrozoutput = "ARROZ: " + arroz.join(", ") +" "+ selectValue;;
    }
    // Verifica se algum input radio foi selecionado
    else if (radioSelecionado !== null) {
        arrozoutput = "ARROZ: " + radioSelecionado.value;
    }
    
    // Caso nenhum elemento seja selecionado
    else {
        alert("Nenhuma opção de arroz selecionada.");
        contador++;
    }
    
    /******************************************************************************************************************************* */
    
    var form = document.getElementById("massas");

    // Captura o valor do input checkbox selecionado
    var checkboxesSelecionados = form.querySelectorAll('input[type="checkbox"]:checked');

    // Captura o valor do input radio selecionado
    var radioSelecionado = form.querySelector('input[type="radio"]:checked');

    // Captura o valor do select
    var selectValue = form.querySelector('select[name="pedido_prato4"]').value;

    // Verifica se alguma checkbox foi selecionada
    if (checkboxesSelecionados.length > 0) {
        // Se sim, crie uma array para armazenar os valores
        var massas = [];
        checkboxesSelecionados.forEach(function (checkbox) {
            massas.push(checkbox.value);
        });
        massasoutput = "MASSAS: " + massas.join(", ") +" "+ selectValue;;
    }
    // Verifica se algum input radio foi selecionado
    else if (radioSelecionado !== null) {
        massasoutput = "MASSAS: " + radioSelecionado.value;
    }
    
    // Caso nenhum elemento seja selecionado
    else {
        alert("Nenhuma opção de massas selecionada.");
        contador++;
    }
    /********************************************************************************************************************* */
    
    var form = document.getElementById("saladas");

    // Captura o valor do input checkbox selecionado
    var checkboxesSelecionados = form.querySelectorAll('input[type="checkbox"]:checked');

    // Captura o valor do input radio selecionado
    var radioSelecionado = form.querySelector('input[type="radio"]:checked');

    // Captura o valor do select
    var selectValue = form.querySelector('select[name="pedido_prato5"]').value;

    // Verifica se alguma checkbox foi selecionada
    if (checkboxesSelecionados.length > 0) {
        // Se sim, crie uma array para armazenar os valores
        var saladas = [];
        checkboxesSelecionados.forEach(function (checkbox) {
            saladas.push(checkbox.value);
        });
        saladaoutput = "SALADAS: " + saladas.join(", ") +" "+ selectValue;;
    }
    // Verifica se algum input radio foi selecionado
    else if (radioSelecionado !== null) {
        saladaoutput = "SALADAS: " + radioSelecionado.value;
    }
    
    // Caso nenhum elemento seja selecionado
    else {
        alert("Nenhuma opção de salada selecionada.");
        contador++;
    }
    /********************************************************************************************************************* */

    if(contador === 0){
        
        if (verificarValoresIguais(frutosDoMaroutput, pescadooutput, arrozoutput, massasoutput, saladaoutput)) {
            resumirPedido(func, f1, f2, frutosDoMaroutput, pescadooutput, arrozoutput, massasoutput, saladaoutput);
        }
       
    }
    else{
        alert("Marque Todas as Opções! Se não quiser alguma marque --> Não quero.")
    }
    
    
}  

function verificarValoresIguais(variavel1, variavel2, variavel3, variavel4, variavel5) {

  
     if (variavel1 ==="MARISCO: zero" && variavel2 === "PEIXE: zero"&& variavel3 ==="ARROZ: zero" && variavel4 === "MASSAS: zero" && variavel5 ==="SALADAS: zero") {
        alert("Adicione pelo menos uma opção");
        return false
       
    } 
    /*else if (variavel1 ==="MARISCO: zero" && variavel2 === "PEIXE: zero"){
        alert("Escolha pelo menos uma porção de fruto do mar (MARISCO OU PEIXE).");
        return false
        
    }*/
    /*else if((variavel3 ==="ARROZ: zero" && variavel4 === "MASSAS: zero" && variavel5 ==="SALADAS: zero")&&(variavel1 ==="MARISCO: zero" || variavel2 == "PEIXE: zero")){
        alert("Adicione pelo menos outra porção de fruto do mar (MARISCO OU PEIXE) ou um acompanhamento");
    return false;
    } */
    else {
    
    return true;


    }
}

function resumirPedido(func,f1,f2, F,P,A,M,S){ 
    const resumoDoPedido = F + "<br>" + P + "<br>" + A + "<br>" + M + "<br>" + S;      
    document.getElementById("resumoPedido").innerHTML = resumoDoPedido;
    func(f1, f2,F,P,A,M,S);
    
}
function calculaValorTotal(){
    valortotal = 0; // Reset do valor total
    // Define a variável com o texto desejado
    

// Obtém o elemento do botão
    var botao = document.getElementById("botao_pedido" );
    // Obtém todos os checkboxes marcados
    var checkedboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    var selects = document.querySelectorAll('select');

    // Inicializa a variável para contar os selects com valor x2
    var quantidadeSelectsX2 = 0;

    // Itera sobre todos os selects
    selects.forEach(function(select) {
        // Verifica se o valor selecionado é x2
        if (select.value === "x2") {
            quantidadeSelectsX2++;
        }
    });

     if(quantidadeSelectsX2 >= 1 && checkedboxes.length > 1){
        valortotal = 25 + ((quantidadeSelectsX2)+(checkedboxes.length - 2)) * 5;

    }
    
    
    // Verifica se o número de checkboxes marcados é maior que 2
    else if (checkedboxes.length > 2 && quantidadeSelectsX2 < 1) {
        // Para cada checkbox marcado acima de 2, adiciona 5 ao valortotal
        valortotal = 25 + (checkedboxes.length - 2) * 5;
    }
    else if (checkedboxes.length === 0 && quantidadeSelectsX2 === 0){
        valortotal = 0;
    } else{
        valortotal = 25;
    }
    
    
    
    document.getElementById("valorDoPedido").innerHTML = "Valor do seu pedido:"+valortotal;

    var textoVariavel = valortotal;
    // Define o texto do botão como o conteúdo da variável
    botao.innerText = "Fazer pedido, valor total:"+" "+textoVariavel;

    //console.log(checkedboxes.length, quantidadeSelectsX2)
    
    
}


opcoes.forEach(function(opcao) {
    opcao.addEventListener("change", function() {
        if (this.value == "Entrega") {
            if(Aux==0){
            valortotal = valortotal + 5;
            Aux++
        }
        else{
            valortotal = valortotal;
        }
            document.getElementById("dadosCliente").style.display = "block";
            document.getElementById("dados").style.display = "block";
            document.getElementById("endereco").style.display = "block";
            document.getElementById("valorDoPedido").innerHTML = "Valor do seu pedido:"+ valortotal;
            formaDeEntrega = "Entrega";
        } else {
            if(Aux==1){
                valortotal = valortotal - 5;
                Aux = 0;
            }
            else{
                valortotal = valortotal;
            }
            document.getElementById("dadosCliente").style.display = "block";
            document.getElementById("dados").style.display = "block";
            document.getElementById("endereco").style.display = "none";
            document.getElementById("valorDoPedido").innerHTML = "Valor do seu pedido:"+ valortotal;
            formaDeEntrega = "Retirada";
        }
        console.log(formaDeEntrega);
    });
});
var opcoes = document.getElementsByName("formadepagamento");
opcoes.forEach(function(opcao) {
    opcao.addEventListener("change", function() {
        formaDePagamento = this.value;
        console.log(formaDePagamento);
    });
});


function enviarPedido(f1, f2, F,P,A,M,S){
    var observacoes = document.getElementById("observacoes").value
    var nome = document.getElementById("nome").value;
    var telefone = document.getElementById("telefone").value;
    var rua = document.getElementById("rua").value;
    var numero = document.getElementById("ruanumero").value;
    var bairro = document.getElementById("bairro").value;
    var complemento = document.getElementById("complemento").value;
    var referencia = document.getElementById("referencia").value;
    
    
    if (formaDeEntrega!==""&&formaDePagamento!==""){

        if (formaDeEntrega == "Entrega"){
        
            if(nome !==""&&telefone!==""&&rua!==""&&numero!==""&&bairro!==""){
            window.location.href = `https://wa.me/5585996951097/?text=PEDIDO:%0A%0A${F}%20%0A${P}%20%0A${A}%20%0A${M}%20%0A${S}%20%0AOBSERVAÇÕES:${observacoes}%0A****************%0APAGAMENTO:%20${formaDePagamento}.%0A****************%0AENTREGA:%20ENTREGA%0A%0ANOME:%20${nome}%0ATELEFONE:%20${telefone}%0ARUA:%20${rua}%0ANUMERO:%20${numero}%0ABAIRRO:%20${bairro}%0ACOMPLEMENTO:%20${complemento}%0APONTO%20DE%20REFERÊNCIA:%20${referencia}%0A****************%0AVALOR_TOTAL:%20${valortotal}%20`  
            }
            else{
                alert("Preencher todos os dados para entrega.")
            }
        }
        else{
        window.location.href = `https://wa.me/5585996951097/?text=PEDIDO:%0A%0A${F}%20%0A${P}%20%0A${A}%20%0A${M}%20%0A${S}%20%0AOBSERVAÇÕES:${observacoes}%0A**************%0APAGAMENTO:%20${formaDePagamento}%0A****************%0AENTREGA:%20RETIRADA%0A%0ANOME:%20${nome}%0A****************%0AVALOR_TOTAL:%20${valortotal}`
    
        }
    }
    else{
        alert("Selecionar forma de entrega e forma de pagamento")
    }
}



    