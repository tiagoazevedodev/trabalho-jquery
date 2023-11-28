total = 0;
const produtosCarrinho = []

function tirarAlerta() {
    alerta = $('#alertaCustomizado');
    alerta.removeClass('mostrarAlerta');
    alerta.hide();
}

function alertaCustomizado(html) {
    alerta = $('#alertaCustomizado');
    
    alerta.html(html); // passa o texto para o alerta
    alerta.addClass('mostrarAlerta'); // adiciona a classe para mostrar o alerta
    alerta.show();

    // temporizador para esconder o alerta
    setTimeout(function() {
        // Remove a classe e esconde o alerta usando jQuery
        tirarAlerta();
    }, 7000); // 3000 milissegundos = 3 segundos
}

$(document).ready(function() {
    $(".add-button").click(function(event) {
        preco = event.target.previousElementSibling.innerHTML; /* isso é o preço */
        preco = parseFloat(preco.slice(2, preco.length));
        floatProduto = event.target.previousElementSibling.previousElementSibling.innerHTML; /* isso é o Float das Armas*/
        nomeProduto = event.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML; /* isso é o Nome*/
        imagemProduto = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.src; /* isso é a imagem*/
        total += preco; /* isso é o total dos produtos adicionados */
        
        produtoAtual = {      /* isso é o objeto com as informações que vai ser adicionado no array */
            nome: nomeProduto,
            preco: preco,
            imagem: imagemProduto
        }
        produtosCarrinho.push(produtoAtual);
        $(".span-quantity").html(`R$${total.toFixed(2)} - ${produtosCarrinho.length} Produtos`);
        alertaCustomizado(`<div class="product product-alert"> <img src="${imagemProduto}" alt="Imagem do produto"> <h4 class="texto-alerta">${nomeProduto}</h4> <p class="float">${floatProduto}</p> <p class="texto-alerta">R$ ${preco.toFixed(2)}</p> <div class="botoes-alerta"><button class="add-button" onclick="tirarAlerta()">  Continuar Comprando </button> <button class="add-button">  ir para o carrinho </button> </div></div>`)
    })
});
