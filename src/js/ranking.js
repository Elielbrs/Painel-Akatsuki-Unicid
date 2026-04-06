// ════════════════════════════════════════════════════════════
// RANKING DE PODERES - SISTEMA COMPLETO
// ════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  // ──────────────────────────────────
  // DADOS DOS MEMBROS
  // ──────────────────────────────────
  const rankingData = [
    {
      posicao: 1,
      medalha: "🥇",
      nome: "Pain (Nagato)",
      titulo: "Portador do Rinnegan",
      nivel: "S+",
      categoria: "ninjutsu",
      cor: "#FFD700",
      video: "https://www.youtube.com/embed/plttl27W7-g",
      tipo: "Ninjutsu Divino",
      poder: 100,
      descricao:
        "Líder supremo da Akatsuki. Domina os Seis Caminhos do Rinnegan. Destruiu a Vila da Folha inteira com facilidade.",
      img: "/assets/img/Pain.png",
    },
    {
      posicao: 2,
      medalha: "🥈",
      nome: "Madara Uchiha",
      titulo: "Ninja Lendário",
      nivel: "S+",
      categoria: "kekkei",
      cor: "#E91E63",
      video: "https://www.youtube.com/embed/DTmY-heSSIY",
      tipo: "Kekkei Genkai Perfeito",
      poder: 100,
      descricao:
        "Fundador da Vila da Folha. Capaz de enfrentar exércitos inteiros sozinho. Invencível em combate direto.",
      img: "/assets/img/Madara.png",
    },
    {
      posicao: 3,
      medalha: "🥉",
      nome: "Obito Uchiha (Tobi)",
      titulo: "Manipulador Oculto",
      nivel: "S+",
      categoria: "kekkei",
      cor: "#9C27B0",
      video: "https://www.youtube.com/embed/0UMqEfpbgAE",
      tipo: "Mangekyō Sharingan",
      poder: 96,
      descricao:
        "Verdadeiro arquiteto da Akatsuki. Seu Kamui permite atravessar qualquer ataque. Orquestrou os principais eventos da série.",
      img: "/assets/img/Tobi.png",
    },
    {
      posicao: 4,
      medalha: "4º",
      nome: "Itachi Uchiha",
      titulo: "Gênio Intocável",
      nivel: "S",
      categoria: "genjutsu",
      cor: "#FF1744",
      video: "https://www.youtube.com/embed/IBwyFK6VqWo",
      tipo: "Genjutsu Perfeito",
      poder: 95,
      descricao:
        "Gênio absoluto da Vila da Folha. Seu Tsukuyomi prende a vítima em ilusão onde 72 horas ocorrem em 1 segundo.",
      img: "/assets/img/Itachi.png",
    },
    {
      posicao: 5,
      medalha: "5º",
      nome: "Kisame Hoshigaki",
      titulo: "Besta Sem Cauda",
      nivel: "S",
      categoria: "taijutsu",
      cor: "#00BCD4",
      video: "https://www.youtube.com/embed/heKGv_U37kw",
      tipo: "Ninjutsu Aquático",
      poder: 92,
      descricao:
        "Um dos 7 Espadachins da Névoa. Sua espada viva Samehada absorve chakra. Praticamente imortal em ambientes com água.",
      img: "/assets/img/Kisame.png",
    },
    {
      posicao: 6,
      medalha: "6º",
      nome: "Kakuzu",
      titulo: "O Coração Eterno",
      nivel: "S",
      categoria: "ninjutsu",
      cor: "#8BC34A",
      video: "https://www.youtube.com/embed/rI7z4rRJb98",
      tipo: "Juinjutsu Especial",
      poder: 90,
      descricao:
        "Tesoureiro da Akatsuki com 5 corações. Pode usar técnicas de 5 elementos diferentes simultaneamente.",
      img: "/assets/img/Kakuzu.png",
    },
    {
      posicao: 7,
      medalha: "7º",
      nome: "Deidara",
      titulo: "Artista da Explosão",
      nivel: "A+",
      categoria: "ninjutsu",
      cor: "#FF9800",
      video: "https://www.youtube.com/embed/sCrCBNEupLw",
      tipo: "Argila Explosiva",
      poder: 85,
      descricao:
        "A arte é o estouro! Molda argila explosiva em criaturas. Sua técnica C0 causa explosão de escala de ilha.",
      img: "/assets/img/Deidara.png",
    },
    {
      posicao: 8,
      medalha: "8º",
      nome: "Konan",
      titulo: "Anjo de Deus",
      nivel: "A+",
      categoria: "ninjutsu",
      cor: "#9C27B0",
      video: "https://www.youtube.com/embed/1ecYRlBmx98",
      tipo: "Ninjutsu de Papel",
      poder: 82,
      descricao:
        "Fundadora da Akatsuki. Controla bilhões de papéis explosivos. Sua técnica de 10 minutos quase derrotou Madara.",
      img: "/assets/img/Konan.png",
    },
    {
      posicao: 9,
      medalha: "9º",
      nome: "Hidan",
      titulo: "Imortal Religioso",
      nivel: "A",
      categoria: "taijutsu",
      cor: "#F44336",
      video: "https://www.youtube.com/embed/06Q8xss1Bkk",
      tipo: "Taijutsu Maldito",
      poder: 78,
      descricao:
        "Devoto de Jashin, recebe imortalidade através de ritual. Forte em combate direto mas menos estratégico que os demais.",
      img: "/assets/img/Hidan.png",
    },
  ];

  // ──────────────────────────────────
  // DOM SELETORES
  // ──────────────────────────────────
  const rankingGrid = document.getElementById("ranking-grid");
  const filtroButtons = document.querySelectorAll(".filtro-btn");
  const statCards = document.querySelectorAll(".stat-card");
  const linkRanking = document.querySelector('a[href="#ranking"]');

  // ────────────────────────────────────────────────────
  // 1. RENDERIZAÇÃO DOS CARDS
  // ────────────────────────────────────────────────────
  function renderizarRanking(lista) {
    rankingGrid.innerHTML = "";

    lista.forEach((membro) => {
      const nivelClass = `nivel-${membro.nivel.toLowerCase().replace("+", "-plus")}`;

      const card = document.createElement("div");
      card.className = "ranking-card animar";
      card.setAttribute("data-categoria", membro.categoria);
      card.style.setProperty("--cor", membro.cor);

      card.innerHTML = `
        <div class="ranking-posicao">#${membro.posicao}</div>
        <div class="ranking-badge">${membro.medalha}</div>

        <div class="ranking-card-header">
          <img src="${membro.img}" alt="${membro.nome}" class="ranking-foto" />
          <div class="ranking-info">
            <div class="ranking-nome">${membro.nome}</div>
            <div class="ranking-titulo">${membro.titulo}</div>
          </div>
        </div>

        <div class="ranking-badges-container">
          <span class="nivel-badge ${nivelClass}">${membro.nivel}</span>
          <span class="tipo-badge">${membro.tipo}</span>
        </div>

        <div class="ranking-poder-container">
          <div class="ranking-poder-label">
            <span>Poder de Combate</span>
            <span id="poder-valor-${membro.posicao}">${membro.poder}%</span>
          </div>
          <div class="ranking-poder-barra">
            <div class="ranking-poder-fill" style="width: 0%;" data-poder="${membro.poder}"></div>
          </div>
        </div>

        <div class="ranking-video-container">
          <iframe
            src="${membro.video}?enablejsapi=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy">
          </iframe>
          <div class="video-overlay"></div>
        </div>

        <div class="ranking-descricao">
          ${membro.descricao}
        </div>
      `;

      rankingGrid.appendChild(card);
    });

    // Reobservar cards após renderização
    observarCards();
  }

  // ────────────────────────────────────────────────────
  // 2. SISTEMA DE FILTROS
  // ────────────────────────────────────────────────────
  function filtrarRanking(categoria) {
    const cards = document.querySelectorAll(".ranking-card");

    // Ripple effect
    event.target.style.animation = "none";
    setTimeout(
      () => (event.target.style.animation = ""),
      10
    );

    cards.forEach((card) => {
      const cardCategoria = card.getAttribute("data-categoria");
      const deveExibir =
        categoria === "todos" || cardCategoria === categoria;

      if (deveExibir) {
        setTimeout(() => {
          card.style.display = "block";
          setTimeout(() => card.classList.add("visivel"), 10);
        }, 50);
      } else {
        card.classList.remove("visivel");
        setTimeout(() => (card.style.display = "none"), 300);
      }
    });

    // Atualizar botão ativo
    filtroButtons.forEach((btn) => btn.classList.remove("ativo"));
    event.target.classList.add("ativo");
  }

  filtroButtons.forEach((btn) => {
    btn.addEventListener("click", () => filtrarRanking(btn.getAttribute("data-categoria")));
  });

  // ────────────────────────────────────────────────────
  // 3. INTERSECTION OBSERVER PARA ANIMAÇÕES
  // ────────────────────────────────────────────────────
  function observarCards() {
    const cards = document.querySelectorAll(".ranking-card");

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
            // Animar barra de poder
            const fill = entry.target.querySelector(".ranking-poder-fill");
            if (fill) {
              const poder = fill.getAttribute("data-poder");
              setTimeout(() => (fill.style.width = poder + "%"), 50);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    cards.forEach((card) => cardObserver.observe(card));
  }

  // ────────────────────────────────────────────────────
  // 4. CONTADOR ANIMADO DOS STATS
  // ────────────────────────────────────────────────────
  function animarStats() {
    const statNumbers = document.querySelectorAll(".stat-number");

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("contado")) {
            entry.target.classList.add("contado");

            const finalValue = parseInt(entry.target.textContent);
            let currentValue = 0;
            const increment = Math.ceil(finalValue / 20);

            const counter = setInterval(() => {
              currentValue += increment;
              if (currentValue >= finalValue) {
                entry.target.textContent = finalValue;
                clearInterval(counter);
              } else {
                entry.target.textContent = currentValue;
              }
            }, 50);

            statObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    statNumbers.forEach((stat) => statObserver.observe(stat));
  }

  // ────────────────────────────────────────────────────
  // 5. EFEITO GLOW NO HOVER DO CARD
  // ────────────────────────────────────────────────────
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".ranking-card");

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        x >= 0 &&
        x <= rect.width &&
        y >= 0 &&
        y <= rect.height
      ) {
        const cor = getComputedStyle(card).getPropertyValue("--cor").trim();
        card.style.boxShadow = `
          0 0 30px ${cor}40,
          0 20px 60px ${cor}20,
          inset 0 0 20px ${cor}10
        `;
      } else {
        card.style.boxShadow = `0 20px 60px ${getComputedStyle(card)
          .getPropertyValue("--cor")
          .trim()}00`;
      }
    });
  });

  // ────────────────────────────────────────────────────
  // 6. SCROLLSPY - Integração com navegação
  // ────────────────────────────────────────────────────
  function ativarScrollSpy() {
    const rankingSection = document.getElementById("ranking");

    const scrollspyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && linkRanking) {
            linkRanking.classList.add("nav-ativa");
          } else if (!entry.isIntersecting && linkRanking) {
            linkRanking.classList.remove("nav-ativa");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-15% 0px -80% 0px",
      }
    );

    scrollspyObserver.observe(rankingSection);
  }

  // ────────────────────────────────────────────────────
  // 7. INICIALIZAÇÃO
  // ────────────────────────────────────────────────────
  renderizarRanking(rankingData);
  animarStats();
  ativarScrollSpy();

  // Animar seção ao entrar na viewport
  const rankingSection = document.getElementById("ranking");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target
            .querySelectorAll(".animar")
            .forEach((el, idx) => {
              setTimeout(
                () => el.classList.add("visivel"),
                idx * 100
              );
            });
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sectionObserver.observe(rankingSection);

  console.log("✓ Sistema de Ranking de Poderes iniciado.");
});
