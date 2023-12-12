total = 0;
const produtosCarrinho = []
quantidades = {}
const logosCartao = {
    "Visa": "./logos/visa.svg",
    "Mastercard": "./logos/mastercard.svg",
    "American Express": "./logos/amex.svg",
    "Discover": "./logos/discover.svg",
    "unknown": "./logos/default.png"
}
function finalizarPix() {
        $(".titulo-pagamento").html("Pagamento realizado com sucesso!");
        $(".inputs_pix").html(`
        <img src="./logos/check.svg" class="qrcode check" alt="qr code">
        `)
        $(".botoes-pagamento").html(``)
}
function validarFomularioPix() {
    const nome = document.getElementById("nomePix").value;
    const cpf = document.getElementById("cpfPix").value;

    if (nome === "" || cpf === "" || cpf.length < 11) {
        return false;
    } else {
        return true;
    }
}

function validarFormularioCredito() {
    const numeroCartao = document.getElementById("numeroCartao").value;
    const nomeTitular = document.getElementById("nomeTitular").value;
    const dataValidade = document.getElementById("dataValidade").value;
    const codigoSeguranca = document.getElementById("codigoSeguranca").value;
    console.log(numeroCartao, nomeTitular, dataValidade, codigoSeguranca);
    if (numeroCartao === "" || numeroCartao.length < 16 || nomeTitular === "" || dataValidade === "" || dataValidade.length < 4|| codigoSeguranca === "" || codigoSeguranca.length < 3) {
        alert("Preencha todos os campos corretamente!");
        return false;
    } else {
        return true
    }

}

function detectCardBrand(numeroCartao) {
    const visaRegex = /^4[0-9]{0,15}$/;
    const mastercardRegex = /^5[1-5][0-9]{0,14}$/;
    const amexRegex = /^3[47][0-9]{0,13}$/;
    const discoverRegex = /^6(?:011|5[0-9]{0,2})[0-9]{0,12}$/;

    if (visaRegex.test(numeroCartao)) {
        return "Visa";
    } else if (mastercardRegex.test(numeroCartao)) {
        return "Mastercard";
    } else if (amexRegex.test(numeroCartao)) {
        return "American Express";
    } else if (discoverRegex.test(numeroCartao)) {
        return "Discover";
    } else {
        return "unknown";
    }
}

function finalizarCompra(){
    $(".cart").hide();
    $(".products").hide();
    $(".finalizar-compra").show();

}

function atualizarCarrinho() {
    const carrinhoHtml = produtosCarrinho.map(converterCarrinhoParaHtml).join('');
    if (produtosCarrinho.length === 0) {
        $(".cart").hide();
        $(".products").show();
    } else {
        $(".cart-products").html(carrinhoHtml);
    }
    total = produtosCarrinho.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
    $(".span-quantity").html(`R$${total.toFixed(2)} - ${produtosCarrinho.length} Produtos`);
    $(".preco-total-carrinho").html(`R$ ${total.toFixed(2)}`);

}

function incrementarQuantidade(event) {
    const nomeProduto = event.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;
    const produto = produtosCarrinho.find(produto => produto.nome === nomeProduto);
    if (produto) { 
        produto.quantidade++;
        atualizarCarrinho();
    }
}
function removerProduto(event) {
    const htmlProduto = event.target.parentElement.parentElement;   // html do produto para retirar da tela ao remover
    const nomeProduto = event.target.parentElement.previousElementSibling.children[0].innerHTML   // nome do produto para retirar do array
    const produto = produtosCarrinho.find(produto => produto.nome === nomeProduto);
    if (produto) {
        quantidades[nomeProduto] = 0;
        produto.quantidade = 0;
        produtosCarrinho.splice(produtosCarrinho.indexOf(produto), 1);
        atualizarCarrinho();
    }
}

function decrementarQuantidade(event) {
    const nomeProduto = event.target.parentElement.parentElement.previousElementSibling.children[0].innerHTML;
    const produto = produtosCarrinho.find(produto => produto.nome === nomeProduto);
    if (produto && produto.quantidade > 1) {
        produto.quantidade--;
        atualizarCarrinho();
    } else {
        produtosCarrinho.splice(produtosCarrinho.indexOf(produto), 1);
        atualizarCarrinho();
    }
}

function tirarAlerta() {
    alerta = $('#alertaCustomizado');
    alerta.removeClass('mostrarAlerta');
    alerta.hide();
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
      <button class="remove-button" onClick="removerProduto(event)">Remove</button>
      <div class="selecionar-quantidade">
        <button class="minus-cart-button" onClick="decrementarQuantidade(event)">-</button>
        <button class="add-cart-button" onClick="incrementarQuantidade(event)">+</button>
        <p class="mostrador-quantidade">${produtoAtual.quantidade}</p>
        </div> 
        <div class="subtotal">
            <div> Subtotal </div> 
            R$ ${(produtoAtual.quantidade * produtoAtual.preco).toFixed(2)}
        </div>
    </div>
  </div>`
}

function tirarProdutos() {
    $(".products").hide();
    tirarAlerta();
    
}
function mostrarCarrinho() {
    if (produtosCarrinho.length > 0) {
    tirarProdutos();
    const carrinhoHtml = produtosCarrinho.map(converterCarrinhoParaHtml).join('');
    $(".cart-products").html(carrinhoHtml);
    $(".cart").show();
    $(".preco-total-carrinho").html(`R$ ${total.toFixed(2)}`);
    } else {
        alert(`Carrinho Vazio! 
Adicione algum produto para continuar!`
            )
    }

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
    $(".receptor-finalizarCompra").hide();
    $(".cart").hide();
    $(".add-button").click(function(event) {
        preco = event.target.previousElementSibling.innerHTML; /* isso é o preço */
        preco = parseFloat(preco.slice(2, preco.length));
        floatProduto = event.target.previousElementSibling.previousElementSibling.innerHTML; /* isso é o Float das Armas*/
        nomeProduto = event.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML; /* isso é o Nome*/
        imagemProduto = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.src; /* isso é a imagem*/
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
        }else {
            produtosCarrinho.find(produto => produto.nome === nomeProduto).quantidade = quantidades[nomeProduto];
        }
        total = produtosCarrinho.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
        $(".span-quantity").html(`R$${total.toFixed(2)} - ${produtosCarrinho.length} Produtos`);
        alertaCustomizado(`
            <div class="product product-alert">
                <img src="${imagemProduto}" alt="Imagem do produto">
                <h4 class="texto-alerta">${nomeProduto}</h4>
                <p class="float">${floatProduto}</p>
                <p class="texto-alerta">R$ ${preco.toFixed(2)}</p>
                <div class="botoes-alerta">
                    <button class="add-button" onclick="tirarAlerta()">  Continuar Comprando </button>
                    <button class="add-button" onclick="mostrarCarrinho()">  Ir para o carrinho </button>
                </div>
            </div>
        `)
    })
    $(".finalizar-compra").click(function(event) {
        $(".receptor-finalizarCompra").show();
        $(".receptor-finalizarCompra").html(`
        <div class="finalizarCompra">
            <!-- Escolha de pagamento aqui -->
            <span class="titulo-seletor-pagamento">Escolha a forma de pagamento</span>
            <div class="botoes-seletor">
            <button class="botao-seletor-pix">Pix</button>
            <button class="botao-seletor-credito">Cartão de crédito</button>
            </div>
        </div>`)
        $(".cart").hide();
        
        // Pix
        $(".botao-seletor-pix").click(function(event) {
            $(".receptor-finalizarCompra").html(`
            <div class="pagamento-pix">
                <span class="titulo-pagamento">Pagamento via Pix</span>
                <div class="inputs_pix">
                    <div class="campo">
                        <span>Nome: </span>
                        <input type="text" id="nomePix" class="input-pix">
                    </div>
                    <div class="campo"><span>CPF: </span><input type="number" id="cpfPix" class="input-pix" maxlength="11" minlength="11"></div>
                </div>
                <div class="botoes-pagamento">
                    <button class="botao-pagamento-qrcode botao-pix">Gerar QR Code</button>
                </div>
            </div>
            `)
            $(".botao-pagamento-qrcode").click(function(event) {
                resultado = validarFomularioPix();
                if (resultado) {
                    $(".titulo-pagamento").html("QR Code");
                    $(".botao-pagamento-qrcode").hide();
                    $(".inputs_pix").html(`
                    <img src="./img/qrcode-render.png" class="qrcode" alt="qr code">
                    `)
                    $(".botoes-pagamento").html(`
                    <button id="finalizar-pix" class="finalizar-pix" onclick="finalizarPix()">Finalizar</button>
                    `)
                } else {
                    alert("Preencha todos os campos obrigatórios!");
                }
            })
        })
        
        $(".botao-seletor-credito").click(function(event) {
            
            parc_1x = total.toFixed(2);
            parc_2x = (total/2).toFixed(2);
            parc_3x = ((total*1.03)/3).toFixed(2);
            parc_4x = ((total*1.04)/4).toFixed(2);
            parc_5x = ((total*1.05)/5).toFixed(2);
            
            
            $(".receptor-finalizarCompra").html(`
            <div class="pagamento-cartao">
                <span class="titulo-pagamento">Pagamento via Cartão de Crédito</span>
                <div class="inputs_cartao">
                    <div class="campo-credito"><span>Nome: </span><input id="nomeTitular" type="text" class="input-pix"></div>
                    <div class="campo-credito"><span>Número do Cartão: </span><input id="numeroCartao" placeholder="xxxx-xxxx-xxxx-xxxx" type="number" class="input-pix" maxlength="16" minlength="16"><div class="bandeira"></div></div>
                    <div class="campo-credito"><span>Validade: </span><input id="dataValidade" type="text" placeholder="mm/aa" class="input-pix" maxlength="5" minlength="5"></div>
                    <div class="campo-credito"><span>CVV: </span><input id="codigoSeguranca" type="number" class="input-pix" maxlength="3" minlength="3"></div>
                </div>
                <div>
                    <span><span class="parcelamento">Parcelamento:</span> 
                        <select class="selectador">
                            <option>1x sem juros - R$ ${parc_1x}</option>
                            <option>2x sem juros - R$ ${parc_2x}</option>
                            <option>3x com juros - R$ ${parc_3x}</option>
                            <option>4x com juros - R$ ${parc_4x}</option>
                            <option>5x com juros - R$ ${parc_5x}</option>
                        </select>
                    <span>
                </div>
                <div class="botoes-pagamento">
                    <button class="botao-pagamento">Finalizar Pagamento</button>
                </div>
            </div>
            `
            )
            $("#numeroCartao").keyup(function(event) {
                numero = event.target.value;
                resultado = detectCardBrand(numero);
                console.log(resultado);
                $(".bandeira").html(`
                    <img src="${logosCartao[resultado]}" class="bandeira-cartao" alt="qr code">
                `)  
            })
            $(".botao-pagamento").click(function(event) {
                resultado = validarFormularioCredito();
                if (resultado) {
                    $(".titulo-pagamento").html("Pagamento realizado com sucesso!");
                    $(".parcelamento").hide();
                    $(".inputs_cartao").html(`
                    <img src="./logos/check.svg" class="qrcode check" alt="qr code">
                    `)
                    $(".botao-pagamento").hide();
                    escolhido = $(".selectador").val();
                    $(".selectador").hide();
                    $(".parcelamento").html(`Pagamento realizado em ${escolhido}`);
                }
            })
        })
    })
})
