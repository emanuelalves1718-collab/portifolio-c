```javascript
const filtros = document.querySelectorAll(".filtro");
const cards = document.querySelectorAll(".card");
const busca = document.getElementById("busca");
const semResultado = document.getElementById("semResultado");

const bilhete = document.getElementById("bilhete");
const selecaoAtual = document.getElementById("selecaoAtual");
const toast = document.getElementById("toast");

let esporteAtual = "Todos";
let selecao = null;
let timerToast;

function mensagem(texto) {
  toast.textContent = texto;
  toast.classList.add("mostrar");

  clearTimeout(timerToast);

  timerToast = setTimeout(() => {
    toast.classList.remove("mostrar");
  }, 2600);
}

// Filtrar partidas por esporte e nome do time
function filtrarPartidas() {
  const termo = busca.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  let quantidade = 0;

  cards.forEach(card => {
    const esporte = card.dataset.esporte;
    const times = card.dataset.times;

    const combinaEsporte =
      esporteAtual === "Todos" || esporte === esporteAtual;

    const combinaBusca =
      times.toLocaleLowerCase("pt-BR").includes(termo);

    const mostrar = combinaEsporte && combinaBusca;

    card.hidden = !mostrar;

    if (mostrar) {
      quantidade++;
    }
  });

  semResultado.hidden = quantidade !== 0;
}

// Eventos dos filtros
filtros.forEach(botao => {
  botao.addEventListener("click", () => {
    esporteAtual = botao.dataset.esporte;

    filtros.forEach(item => {
      item.classList.remove("ativo");
    });

    botao.classList.add("ativo");
    filtrarPartidas();
  });
});

// Pesquisa de times
busca.addEventListener("input", filtrarPartidas);

// Selecionar cotação demonstrativa
document.querySelectorAll(".odd").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".odd").forEach(item => {
      item.classList.remove("selecionado");
    });

    botao.classList.add("selecionado");

    selecao = {
      nome: botao.dataset.selecao,
      odd: botao.dataset.odd
    };

    selecaoAtual.innerHTML = `
      <strong>${selecao.nome}</strong>
      <span>Cotação fictícia: </span>
      <b>${selecao.odd}</b>
    `;

    bilhete.classList.add("aberto");
  });
});

// Fechar bilhete
document.getElementById("fechar")
  .addEventListener("click", () => {
    bilhete.classList.remove("aberto");
  });

// Testar a interação do bilhete
document.getElementById("confirmar")
  .addEventListener("click", () => {
    if (!selecao) {
      mensagem("Selecione uma cotação demonstrativa primeiro.");
      return;
    }

    mensagem(
      "Teste concluído! Nenhuma aposta real foi realizada."
    );

    bilhete.classList.remove("aberto");
  });

// Botão Entrar
document.getElementById("entrar")
  .addEventListener("click", () => {
    mensagem("Login ilustrativo: nenhuma conta será criada.");
  });

// Menu para celulares
document.getElementById("menu")
  .addEventListener("click", () => {
    const nav = document.getElementById("nav");

    nav.classList.toggle("aberto");
  });

// Fechar menu ao clicar num link
document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav")
      .classList.remove("aberto");
  });
});

// Inicializar filtros
filtrarPartidas();
```
