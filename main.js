total = 0;
const produtosCarrinho = []
$(document).ready(function() {
    $(".add-button").click(function(event) {
        preco = event.target.previousElementSibling.innerHTML; /* isso é o preço */
        preco = parseFloat(preco.slice(2, preco.length));
        nomeProduto = event.target.previousElementSibling.previousElementSibling.innerHTML; /* isso é o Nome*/
        imagemProduto =event.target.previousElementSibling.previousElementSibling.previousElementSibling.src; /* isso é a imagem*/
        total += preco; /* isso é o total dos produtos adicionados */
        
        produtoAtual = {      /* isso é o objeto com as informações que vai ser adicionado no array */
            nome: nomeProduto,
            preco: preco,
            imagem: imagemProduto
        }
        produtosCarrinho.push(produtoAtual);
        console.log(produtosCarrinho);
        $(".span-quantity").html(`R$${total.toFixed(2)} - ${produtosCarrinho.length} Produtos`);
    })
});
