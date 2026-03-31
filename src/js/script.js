document.addEventListener("DOMContentLoaded", () => {
  // ── Seletores ─────────────────────────────────────────────
  const cards = document.querySelectorAll(".membro-card");
  const botoesFiltro = document.querySelectorAll(".btn-filtro");
  const linksNav = document.querySelectorAll(".nav-bar nav a");
  const secoes = document.querySelectorAll("section[id]");

  // ════════════════════════════════════════════════════════
  // 1. FLIP CARD
  // ════════════════════════════════════════════════════════
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("flipped");
    });

    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.classList.toggle("flipped");
      }
    });
  });

  // ════════════════════════════════════════════════════════
  // 2. FILTRO DE MEMBROS
  // ════════════════════════════════════════════════════════
  window.filtrarMembros = function (categoria) {
    cards.forEach((card) => {
      const tipo = card.getAttribute("data-tipo");
      const deveExibir = categoria === "todos" || tipo === categoria;

      card.style.display = deveExibir ? "" : "none";

      if (!deveExibir) card.classList.remove("flipped");
      if (deveExibir) card.classList.add("visivel");
    });

    botoesFiltro.forEach((btn) => btn.classList.remove("ativo"));
    const btnAtivo = [...botoesFiltro].find((btn) =>
      btn.getAttribute("onclick")?.includes(categoria),
    );
    if (btnAtivo) btnAtivo.classList.add("ativo");
  };

  const btnTodos = [...botoesFiltro].find((btn) =>
    btn.getAttribute("onclick")?.includes("todos"),
  );
  if (btnTodos) btnTodos.classList.add("ativo");

  // ════════════════════════════════════════════════════════
  // 3. ANIMAÇÃO DE ENTRADA DOS CARDS (Intersection Observer)
  // ════════════════════════════════════════════════════════
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
        } else {
          entry.target.classList.remove("visivel");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  cards.forEach((card) => cardObserver.observe(card));

  // ════════════════════════════════════════════════════════
  // 4. SCROLLSPY — Destaque na nav conforme seção visível
  //
  // PROBLEMA CORRIGIDO: threshold: 0.4 nunca dispara em
  // seções maiores que a viewport (como #membros com 8 cards).
  //
  // SOLUÇÃO: rootMargin cria uma "zona de detecção" entre
  // 15% e 20% da tela. Quando a seção entra nessa faixa,
  // o link correspondente na nav é ativado.
  // ════════════════════════════════════════════════════════
  const ativarLinkNav = (id) => {
    linksNav.forEach((link) => link.classList.remove("nav-ativa"));
    const linkAtivo = [...linksNav].find(
      (link) => link.getAttribute("href") === `#${id}`,
    );
    if (linkAtivo) linkAtivo.classList.add("nav-ativa");
  };

  const scrollspyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ativarLinkNav(entry.target.id);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "-15% 0px -80% 0px",
    },
  );

  secoes.forEach((secao) => scrollspyObserver.observe(secao));

  // ════════════════════════════════════════════════════════
  // 5. ANIMAÇÕES DA SEÇÃO ORIGEM
  // ════════════════════════════════════════════════════════
  const origemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translate(0, 0) scale(1)";
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    item.style.transform = item.classList.contains("timeline-left")
      ? "translateX(-40px)"
      : "translateX(40px)";
    origemObserver.observe(item);
  });

  document.querySelectorAll(".fundador-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    origemObserver.observe(card);
  });

  // ════════════════════════════════════════════════════════
  // 6. DUPLAS AKATSUKI — Flip e animação de entrada
  // ════════════════════════════════════════════════════════
  const duplaCards = document.querySelectorAll(".dupla-card");
  // Animação de entrada
  duplaCards.forEach((card, idx) => {
    card.style.transitionDelay = `${0.1 + idx * 0.12}s`;
    setTimeout(() => card.classList.add("visivel"), 200 + idx * 120);
  });

  // Flip card ao clicar ou pressionar Enter/Espaço
  duplaCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.toggle("flipped");
    });
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.classList.toggle("flipped");
      }
    });
  });

  const manipulador = document.querySelector(".manipulador-section");
  if (manipulador) {
    manipulador.style.opacity = "0";
    manipulador.style.transform = "scale(0.95)";
    manipulador.style.transition =
      "opacity 0.6s ease, transform 0.6s ease 0.2s";
    origemObserver.observe(manipulador);
  }
});

// ════════════════════════════════════════════════════════
// 7. DUPLAS PREMIUM — Modal de detalhes e animação
// ════════════════════════════════════════════════════════
const duplasDetalhes = {
  "itachi-kisame": {
    titulo: "Itachi & Kisame",
    subtitulo: "A Névoa Silenciosa",
    descricao:
      "Itachi, mestre do genjutsu, e Kisame, o monstro da névoa, formam uma dupla de furtividade e força bruta. Suas missões são rápidas, limpas e quase impossíveis de rastrear. Juntos, equilibram inteligência estratégica e poder destrutivo.",
    curiosidades: [
      "Itachi é o único parceiro que Kisame respeitou de verdade.",
      "Ambos são especialistas em infiltração e assassinato.",
      "A combinação de genjutsu e ataques aquáticos é letal.",
    ],
  },
  "hidan-kakuzu": {
    titulo: "Hidan & Kakuzu",
    subtitulo: "Imortais Mercenários",
    descricao:
      "Hidan, o imortal sádico, e Kakuzu, o caçador de recompensas, unem brutalidade e ganância. Impossíveis de matar, são temidos até entre criminosos. Suas discussões são lendárias, mas funcionam perfeitamente em combate.",
    curiosidades: [
      "Nunca perderam uma missão juntos.",
      "Kakuzu já tentou matar Hidan várias vezes (sem sucesso).",
      "São a dupla mais durável da Akatsuki.",
    ],
  },
  "deidara-sasori": {
    titulo: "Deidara & Sasori",
    subtitulo: "Arte Explosiva",
    descricao:
      "Deidara, o artista das explosões, e Sasori, o mestre das marionetes, misturam criatividade e veneno em ataques imprevisíveis e devastadores. Suas filosofias sobre arte são opostas, mas juntos são imparáveis.",
    curiosidades: [
      "Deidara considera Sasori seu maior rival artístico.",
      "Sasori prefere ataques calculados, Deidara improvisa.",
      "Ambos são especialistas em combate à distância.",
    ],
  },
  "pain-konan": {
    titulo: "Pain & Konan",
    subtitulo: "Deuses da Chuva",
    descricao:
      "Pain, o líder absoluto, e Konan, a anjo de papel, comandam a Akatsuki com estratégia, poder e lealdade inabalável. São os fundadores e o coração da organização.",
    curiosidades: [
      "Konan é a única que chama Pain pelo nome verdadeiro (Nagato).",
      "Ambos cresceram juntos em Amegakure.",
      "Konan é a conselheira mais próxima de Pain.",
    ],
  },
};

document.querySelectorAll(".dupla-premium-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    const dupla = this.getAttribute("data-dupla");
    const modal = document.getElementById("dupla-modal");
    const body = document.getElementById("dupla-modal-body");
    if (duplasDetalhes[dupla]) {
      const d = duplasDetalhes[dupla];
      body.innerHTML = `
                <h2 style="color:var(--akatsuki-gold);margin-bottom:8px;">${d.titulo}</h2>
                <h4 style="color:var(--akatsuki-red-primary);margin-bottom:18px;">${d.subtitulo}</h4>
                <p style="font-size:1.15rem;margin-bottom:18px;">${d.descricao}</p>
                <ul style="text-align:left;max-width:420px;margin:0 auto 0 auto;padding-left:18px;">
                    ${d.curiosidades.map((c) => `<li style='margin-bottom:8px;'>${c}</li>`).join("")}
                </ul>
            `;
      modal.style.display = "flex";
      setTimeout(() => {
        document.getElementById("dupla-modal-close").focus();
      }, 200);
    }
  });
});
document
  .getElementById("dupla-modal-close")
  .addEventListener("click", function () {
    document.getElementById("dupla-modal").style.display = "none";
  });
document.getElementById("dupla-modal").addEventListener("click", function (e) {
  if (e.target === this) this.style.display = "none";
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("dupla-modal").style.display = "none";
  }
});
