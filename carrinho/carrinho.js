// Seleciona o elemento onde o conteúdo do carrinho será exibido
const conteudo = document.getElementById('conteudo-carrinho');

// Recupera os itens do carrinho armazenados no localStorage ou cria um array vazio caso não exista nada
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Verifica se o carrinho está vazio
if (carrinho.length === 0) {
  // Se estiver vazio, exibe uma mensagem amigável
  conteudo.innerHTML = `
    <div class="carrinho-vazio">
      <p><strong>🛒 Seu carrinho está vazio no momento.</strong></p>
      <p>Que tal dar uma olhada no nosso catálogo e escolher algo incrível?</p>
    </div>
  `;
} else {
  // Se houver itens no carrinho, cria a listagem
  let total = 0;

  // Para cada filme no carrinho, cria um "card"
  carrinho.forEach(filme => {
    const item = document.createElement('div');
    item.className = 'card-carrinho';

    // Define o HTML com imagem, título, descrição e preço
    item.innerHTML = `
      <img src="${filme.imagem}" alt="${filme.titulo}">
      <div>
        <h2>${filme.titulo}</h2>
        <p>${filme.descricao}</p>
        <p>Preço: R$ ${filme.preco.toFixed(2)}</p>
      </div>
    `;

    // Cria botão "Remover" e adiciona evento para removê-lo do carrinho
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = () => removerDoCarrinho(filme.id);

    // Adiciona o botão dentro da div de informações
    item.querySelector('div').appendChild(botaoRemover);

    // Adiciona o item ao conteúdo da página
    conteudo.appendChild(item);

    // Soma o preço ao total
    total += filme.preco;
  });

  // Exibe o valor total de todos os itens no carrinho
  const totalElemento = document.createElement('p');
  totalElemento.style.fontSize = '1.2em';
  totalElemento.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
  conteudo.appendChild(totalElemento);
}

// Evento do botão "Finalizar Compra"
document.getElementById('finalizar-compra').addEventListener('click', () => {
  // Recupera o carrinho atualizado do localStorage
  const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verifica se há itens antes de seguir para o pagamento
  if (carrinhoAtual.length === 0) {
    alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
    return;
  }

  // Redireciona para a página de pagamento
  window.location.href = '../pagamento/pagamento.html';
});