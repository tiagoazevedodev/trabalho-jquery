
total = 0;
const produtosCarrinho = []
quantidades = {}

function atualizarCarrinho() {
    const carrinhoHtml = produtosCarrinho.map(converterCarrinhoParaHtml).join('');
    $(".cart").html(carrinhoHtml);
}

function incrementarQuantidade(nomeProduto) {
    const produto = produtosCarrinho.find(produto => produto.nome === nomeProduto);
    if (produto) {
        produto.quantidade++;
        atualizarCarrinho();
    }
}

function decrementarQuantidade(nomeProduto) {
    const produto = produtosCarrinho.find(produto => produto.nome === nomeProduto);
    if (produto && produto.quantidade > 1) {
        produto.quantidade--;
        atualizarCarrinho();
    }
}

function tirarAlerta() {
    alerta = $('#alertaCustomizado');
    alerta.removeClass('mostrarAlerta');
    alerta.hide();
}

function removerProduto(event) {
    const htmlProduto = event.target.parentElement.parentElement.parentElement.innerHTML;
    const nomeProduto = htmlProduto.chieldren[1].chieldren[0].innerHTML;
    const produto = produtosCarrinho.find(produto => produto.nome === nomeProduto);
    if (produto) {
        produtosCarrinho.splice(produtosCarrinho.indexOf(produto), 1);
        atualizarCarrinho();
    }
}

function converterCarrinhoParaHtml(produtoAtual) {
    return `
    <div class="cart-product">
    <img src="${produtoAtual.imagem}" alt="Product 1">
    <div class="detail">
      <h2>${produtoAtual.nome}</h2>
      <p class="float">${produtoAtual.float}</p>
      <p>R$${produtoAtual.preco}</p>
    </div>
    <div class="buttons">
      <button class="remove-button" onClick="removerProduto()">Remove</button>
      <div class="selecionar-quantidade">
        <button class="minus-cart-button" onClick="decrementarQuantidade()">-</button>
        <button class="add-cart-button" onClick="incrementarQuantidade()">+</button>
        <p class="mostrador-quantidade">${produtoAtual.quantidade}</p>
      </div> 
    </div>
  </div>`
}

function tirarProdutos() {
    $(".products").hide();
    tirarAlerta();
    
}
function mostrarCarrinho() {
    tirarProdutos();
    const carrinhoHtml = produtosCarrinho.map(converterCarrinhoParaHtml).join('');
    $(".cart-products").html(carrinhoHtml);
    $(".cart").show();
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
    }, 7000); // 7000 milissegundos = 7 segundos
}

$(document).ready(function() {
    $(".cart").hide();
    $(".add-button").click(function(event) {
        preco = event.target.previousElementSibling.innerHTML; /* isso é o preço */
        preco = parseFloat(preco.slice(2, preco.length));
        floatProduto = event.target.previousElementSibling.previousElementSibling.innerHTML; /* isso é o Float das Armas*/
        nomeProduto = event.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML; /* isso é o Nome*/
        imagemProduto = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.src; /* isso é a imagem*/
        total += preco; /* isso é o total dos produtos adicionados */
        quantidades[nomeProduto] = quantidades[nomeProduto] || 0;
        quantidades[nomeProduto]++;
        produtoAtual = {      /* isso é o objeto com as informações que vai ser adicionado no array */
        nome: nomeProduto,
        preco: preco,
        imagem: imagemProduto,
        float: floatProduto,
        quantidade: quantidades[nomeProduto]
        }
        if (!produtosCarrinho.some(produto => produto.nome === nomeProduto)) { /* isso é para não adicionar o mesmo produto duas vezes */
            produtosCarrinho.push(produtoAtual);
        }
        console.log(produtosCarrinho);
        $(".span-quantity").html(`R$${total.toFixed(2)} - ${produtosCarrinho.length} Produtos`);
        alertaCustomizado(`
            <div class="product product-alert">
                <img src="${imagemProduto}" alt="Imagem do produto">
                <h4 class="texto-alerta">${nomeProduto}</h4>
                <p class="float">${floatProduto}</p>
                <p class="texto-alerta">R$ ${preco.toFixed(2)}</p>
                <div class="botoes-alerta">
                    <button class="add-button" onclick="tirarAlerta()">  Continuar Comprando </button>
                    <button class="add-button" onclick="mostrarCarrinho()">  ir para o carrinho </button>
                </div>
            </div>
        `)
    })
});
