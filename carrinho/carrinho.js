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
  const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinhoAtual.length === 0) {
    alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
    return;
  }
  window.location.href = '../pagamento/pagamento.html';
});

// Função para remover um item do carrinho
function removerDoCarrinho(id) {
  const index = carrinho.findIndex(filme => filme.id === id);
  if (index === -1) return;

  // Remove do array
  carrinho.splice(index, 1);

  // Atualiza o localStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  // Remove o card do DOM
  const cards = document.querySelectorAll('.card-carrinho');
  const cardRemover = cards[index];
  if (cardRemover) cardRemover.remove();

  // Atualiza o total ou exibe a mensagem de carrinho vazio
  atualizarTotalOuMensagem();
}

// Atualiza o valor total ou mostra a mensagem de carrinho vazio
function atualizarTotalOuMensagem() {
  if (carrinho.length === 0) {
    conteudo.innerHTML = `
      <div class="carrinho-vazio">
        <p><strong>🛒 Seu carrinho está vazio no momento.</strong></p>
        <p>Que tal dar uma olhada no nosso catálogo e escolher algo incrível?</p>
      </div>
    `;
    return;
  }

  // Atualiza o total exibido
  const total = carrinho.reduce((soma, filme) => soma + filme.preco, 0);
  const totalElemento = document.querySelector('#conteudo-carrinho p strong');
  if (totalElemento) {
    totalElemento.innerHTML = `Total: R$ ${total.toFixed(2)}`;
  }
}
// Evento do botão "Limpar Carrinho"
const botaoLimpar = document.getElementById('limpar-carrinho');
if (botaoLimpar) {
  botaoLimpar.addEventListener('click', () => {
    const confirmacao = confirm("Tem certeza que deseja esvaziar o carrinho?");
    if (confirmacao) {
      localStorage.removeItem('carrinho');
      location.reload();
    }
  });

  // Oculta o botão se o carrinho estiver vazio
  if (carrinho.length === 0) {
    botaoLimpar.style.display = 'none';
  }
}
