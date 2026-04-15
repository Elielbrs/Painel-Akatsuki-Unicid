document.addEventListener("DOMContentLoaded", () => {
  // ── Seletores ─────────────────────────────────────────────
  const cards = document.querySelectorAll(".membro-card");
  const botoesFiltro = document.querySelectorAll(".btn-filtro");
  const linksNav = document.querySelectorAll(".nav-bar nav a");
  const secoes = document.querySelectorAll("section[id]");

  // ════════════════════════════════════════════════════════
  // 0. MENU HAMBURGUER MOBILE
  // ════════════════════════════════════════════════════════
  const hamburguer = document.getElementById('nav-hamburguer');
  const navMenu    = document.querySelector('.nav-bar nav');

  hamburguer?.addEventListener('click', () => {
      const aberto = navMenu.classList.toggle('aberto');
      hamburguer.innerHTML = aberto
          ? '<i class="fas fa-times"></i>'
          : '<i class="fas fa-bars"></i>';
  });

  // Fecha o menu ao clicar em qualquer link
  document.querySelectorAll('.nav-bar nav a').forEach(link => {
      link.addEventListener('click', () => {
          navMenu.classList.remove('aberto');
          hamburguer.innerHTML = '<i class="fas fa-bars"></i>';
      });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-bar')) {
          navMenu.classList.remove('aberto');
          hamburguer.innerHTML = '<i class="fas fa-bars"></i>';
      }
  });

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
  function filtrarMembros(categoria) {
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
  }
  
  // Make filtrarMembros accessible to inline onclick handlers
  window.filtrarMembros = filtrarMembros;

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
    document.title = `Akatsuki Wiki — ${linkAtivo?.textContent.trim() ?? 'Home'}`;
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

  // ════════════════════════════════════════════════════════
  // ANIMAÇÕES DA SEÇÃO OBJETIVOS
  // ════════════════════════════════════════════════════════
  const objetivoCards = document.querySelectorAll(".objetivo-card");
  const objetivosVisao = document.querySelector(".objetivos-visao");

  // Observer para animação dos cards de objetivos
  const objetivosObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  // Aplicar staggered animation aos cards
  objetivoCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    objetivosObserver.observe(card);
  });

  // Animar visão final com escala - Observer separado com melhor configuração
  if (objetivosVisao) {
    const visaoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );
    visaoObserver.observe(objetivosVisao);
  }

  // ════════════════════════════════════════════════════════
  // DUPLAS PREMIUM — Animação de entrada
  // ════════════════════════════════════════════════════════
  const duplasPremiumCards = document.querySelectorAll(".dupla-premium-card");
  
  const duplasObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  duplasPremiumCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    duplasObserver.observe(card);
  });

  // ════════════════════════════════════════════════════════
  // CURIOSIDADES — Animação de entrada e interatividade
  // ════════════════════════════════════════════════════════
  const curiosidadeCards = document.querySelectorAll(".curiosidade-card");
  const conclusao = document.querySelector(".curiosidades-conclusao");

  const curiosidadesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  curiosidadeCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
    curiosidadesObserver.observe(card);
  });

  // Animar conclusão
  if (conclusao) {
    const conclusaoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );
    conclusaoObserver.observe(conclusao);
  }

  // ════════════════════════════════════════════════════════
  // SEÇÃO 8. SISTEMA DE BUSCA DE MEMBROS
  // ════════════════════════════════════════════════════════
  const buscaInput   = document.getElementById('busca-input');
  const buscaLimpar  = document.getElementById('busca-limpar');
  const buscaResult  = document.getElementById('busca-resultado');

  buscaInput?.addEventListener('input', function() {
      const termo = this.value.trim().toLowerCase();
      let visiveis = 0;

      cards.forEach(card => {
          const nome = card.querySelector('h3')?.textContent.toLowerCase() ?? '';
          const desc = card.querySelector('.membro-desc')?.textContent.toLowerCase() ?? '';
          const bate = nome.includes(termo) || desc.includes(termo);

          card.style.display = bate ? '' : 'none';
          if (bate) visiveis++;
      });

      buscaLimpar.classList.toggle('visivel-inline', termo.length > 0);

      if (termo.length === 0) {
          buscaResult.textContent = '';
      } else if (visiveis === 0) {
          buscaResult.textContent = 'Nenhum membro encontrado.';
      } else {
          buscaResult.textContent =
              `${visiveis} membro${visiveis > 1 ? 's' : ''} encontrado${visiveis > 1 ? 's' : ''}.`;
      }
  });

  buscaLimpar?.addEventListener('click', () => {
      buscaInput.value = '';
      buscaInput.dispatchEvent(new Event('input'));
      buscaInput.focus();
  });

  // ════════════════════════════════════════════════════════
  // SEÇÃO 9. QUIZ INTERATIVO
  // ════════════════════════════════════════════════════════
  const perguntas = [
      {
          pergunta: "Quem é o verdadeiro líder por trás da Akatsuki?",
          opcoes: ["Pain (Nagato)", "Madara Uchiha", "Obito Uchiha", "Konan"],
          correta: 1,
          explicacao: "Madara Uchiha manipulou a Akatsuki desde as sombras usando Obito como intermediário."
      },
      {
          pergunta: "Qual é o jutsu mais poderoso de Pain?",
          opcoes: ["Amaterasu", "Chibaku Tensei", "Shinra Tensei", "Tsukuyomi"],
          correta: 1,
          explicacao: "Chibaku Tensei cria uma lua artificial capaz de aprisionar o Kyuubi."
      },
      {
          pergunta: "Quantos corações Kakuzu possui?",
          opcoes: ["3", "4", "5", "6"],
          correta: 2,
          explicacao: "Kakuzu roubou 5 corações de ninjas poderosos, tornando-se quase imortal."
      },
      {
          pergunta: "Qual é a espada viva de Kisame Hoshigaki?",
          opcoes: ["Kubikiribōchō", "Samehada", "Nuibari", "Shibuki"],
          correta: 1,
          explicacao: "Samehada é uma espada senciente que absorve o chakra dos inimigos."
      },
      {
          pergunta: "Qual é o deus que Hidan adora?",
          opcoes: ["Indra", "Hagoromo", "Jashin", "Hamura"],
          correta: 2,
          explicacao: "Hidan é devoto de Jashin, divindade que lhe concedeu imortalidade."
      },
      {
          pergunta: "Quem foi a única mulher fundadora da Akatsuki?",
          opcoes: ["Karin", "Konan", "Mei Terumi", "Tsunade"],
          correta: 1,
          explicacao: "Konan fundou a Akatsuki ao lado de Yahiko e Nagato em Amegakure."
      },
      {
          pergunta: "Qual técnica Itachi usa para prender alguém em uma ilusão de 72 horas?",
          opcoes: ["Amaterasu", "Susano'o", "Tsukuyomi", "Izanagi"],
          correta: 2,
          explicacao: "Tsukuyomi é o genjutsu ocular de Itachi que distorce a percepção do tempo, fazendo 72 horas parecerem ocorrer em um instante."
      },
      {
          pergunta: "De qual vila Deidara é originário?",
          opcoes: ["Vila da Névoa", "Vila da Pedra", "Vila da Areia", "Vila da Folha"],
          correta: 1,
          explicacao: "Deidara é um ninja renegado da Vila da Pedra (Iwagakure)."
      }
  ];

  (function() {
      let perguntaAtual = 0;
      let pontos = 0;
      let respondeu = false;

      const telaInicio    = document.getElementById('quiz-inicio');
      const telaPergunta  = document.getElementById('quiz-pergunta');
      const telaResultado = document.getElementById('quiz-resultado');

      function mostrarTela(tela) {
          [telaInicio, telaPergunta, telaResultado].forEach(t => {
              if (t) t.classList.add('quiz-oculto');
          });
          if (tela) tela.classList.remove('quiz-oculto');
      }

      function carregarPergunta() {
          respondeu = false;
          const p = perguntas[perguntaAtual];
          document.getElementById('quiz-num').textContent      = perguntaAtual + 1;
          document.getElementById('quiz-texto-pergunta').textContent = p.pergunta;
          document.getElementById('quiz-feedback').textContent = '';
          document.getElementById('quiz-barra-fill').style.width =
              `${((perguntaAtual) / perguntas.length) * 100}%`;

          const container = document.getElementById('quiz-opcoes');
          container.innerHTML = '';
          p.opcoes.forEach((opcao, i) => {
              const btn = document.createElement('button');
              btn.className    = 'quiz-opcao';
              btn.textContent  = opcao;
              btn.addEventListener('click', () => responder(i, btn));
              container.appendChild(btn);
          });
      }

      function responder(indice, btnClicado) {
          if (respondeu) return;
          respondeu = true;

          const p    = perguntas[perguntaAtual];
          const opts = document.querySelectorAll('.quiz-opcao');
          opts.forEach(b => b.disabled = true);
          opts[p.correta].classList.add('correta');

          if (indice === p.correta) {
              pontos++;
              btnClicado.classList.add('correta');
          } else {
              btnClicado.classList.add('errada');
          }

          document.getElementById('quiz-pontos').textContent  = pontos;
          document.getElementById('quiz-feedback').textContent = p.explicacao;

          setTimeout(() => {
              perguntaAtual++;
              if (perguntaAtual < perguntas.length) {
                  carregarPergunta();
              } else {
                  mostrarResultado();
              }
          }, 2200);
      }

      function mostrarResultado() {
          document.getElementById('quiz-barra-fill').style.width = '100%';
          mostrarTela(telaResultado);

          const pct = pontos / perguntas.length;
          let icone, titulo, msg;

          if (pct === 1) {
              icone = '🏆'; titulo = 'Nível: Pain!';
              msg = 'Perfeito! Você conhece a Akatsuki como se fosse membro dela.';
          } else if (pct >= 0.75) {
              icone = '🔥'; titulo = 'Nível: Itachi!';
              msg = 'Excelente! Seu conhecimento é digno de um gênio Uchiha.';
          } else if (pct >= 0.5) {
              icone = '⚡'; titulo = 'Nível: Kisame!';
              msg = 'Bom resultado! Você sabe mais do que a maioria dos ninjas.';
          } else {
              icone = '💀'; titulo = 'Nível: Recruta...';
              msg = 'Ainda há muito a aprender sobre a Akatsuki. Tente novamente!';
          }

          document.getElementById('quiz-resultado-icone').textContent  = icone;
          document.getElementById('quiz-resultado-titulo').textContent  = titulo;
          document.getElementById('quiz-resultado-msg').textContent     = msg;
          document.getElementById('quiz-pontuacao-final').textContent   =
              `${pontos}/${perguntas.length} pontos`;
      }

      document.getElementById('quiz-iniciar')?.addEventListener('click', () => {
          perguntaAtual = 0;
          pontos        = 0;
          mostrarTela(telaPergunta);
          carregarPergunta();
      });

      document.getElementById('quiz-reiniciar')?.addEventListener('click', () => {
          perguntaAtual = 0;
          pontos        = 0;
          mostrarTela(telaPergunta);
          carregarPergunta();
      });
  })();

  // ════════════════════════════════════════════════════════
  // SEÇÃO 10. COMPARADOR DE MEMBROS
  // ════════════════════════════════════════════════════════
  const dadosMembros = {
      itachi:  { nome:"Itachi Uchiha",  img:"/assets/img/Itachi.png",  nivel:"S",  chakra:88, velocidade:95, forca:80, intel:99 },
      madara:  { nome:"Madara Uchiha",  img:"/assets/img/Madara.png",  nivel:"S+", chakra:100,velocidade:80, forca:100,intel:100},
      pain:    { nome:"Pain (Nagato)",  img:"/assets/img/Pain.png",    nivel:"S+", chakra:100,velocidade:78, forca:85, intel:95 },
      konan:   { nome:"Konan",          img:"/assets/img/KonanClas.png", nivel:"A+", chakra:75, velocidade:82, forca:70, intel:88 },
      kisame:  { nome:"Kisame",         img:"/assets/img/Kisame.png",  nivel:"S",  chakra:98, velocidade:80, forca:92, intel:75 },
      deidara: { nome:"Deidara",        img:"/assets/img/Deidara.png", nivel:"A+", chakra:78, velocidade:90, forca:65, intel:82 },
      hidan:   { nome:"Hidan",          img:"/assets/img/Hidan.png",   nivel:"A+", chakra:70, velocidade:75, forca:80, intel:55 },
      kakuzu:  { nome:"Kakuzu",         img:"/assets/img/Kakuzu.png",  nivel:"S",  chakra:95, velocidade:72, forca:90, intel:85 },
      tobi:    { nome:"Tobi (Obito)",   img:"/assets/img/Tobi.png",    nivel:"S+", chakra:98, velocidade:92, forca:88, intel:100}
  };

  function renderComparador() {
      const v1  = document.getElementById('select-1')?.value;
      const v2  = document.getElementById('select-2')?.value;
      const div = document.getElementById('comparador-resultado');
      if (!div) return;
      if (!v1 || !v2) { div.innerHTML = ''; return; }

      const m1 = dadosMembros[v1];
      const m2 = dadosMembros[v2];
      const stats = ['chakra','velocidade','forca','intel'];
      const labels = { chakra:'Chakra', velocidade:'Velocidade', forca:'Força', intel:'Inteligência' };
      const cores  = { chakra:'linear-gradient(90deg,#0d2b6e,#00aaff)',
                       velocidade:'linear-gradient(90deg,#D4AF37,#FFD700)',
                       forca:'linear-gradient(90deg,#8B0000,#C41E3A)',
                       intel:'linear-gradient(90deg,#2a1a4a,#6a3a9a)' };

      function cardHTML(m, outro) {
          const statsHTML = stats.map(s => {
              const melhor = m[s] >= outro[s] ? 'melhor' : '';
              return `<div class="comp-stat-row">
                  <div class="comp-stat-header">
                      <span class="comp-stat-nome">${labels[s]}</span>
                      <span class="comp-stat-val">${m[s]}/100</span>
                  </div>
                  <div class="comp-barra-bg">
                      <div class="comp-barra-fill ${melhor}"
                           style="width:${m[s]}%;background:${cores[s]}"></div>
                  </div>
              </div>`;
          }).join('');
          return `<div class="comp-card">
              <img src="${m.img}" alt="${m.nome}" class="comp-img" loading="lazy">
              <span class="comp-nome">${m.nome}</span>
              <span class="comp-nivel">Nível ${m.nivel}</span>
              <div class="comp-stats">${statsHTML}</div>
          </div>`;
      }

      div.innerHTML = `
          ${cardHTML(m1, m2)}
          <div class="comp-divisor">
              <div class="comp-divisor-linha"></div>
              <span class="comp-vs-badge">VS</span>
              <div class="comp-divisor-linha"></div>
          </div>
          ${cardHTML(m2, m1)}
      `;
  }

  document.getElementById('select-1')?.addEventListener('change', renderComparador);
  document.getElementById('select-2')?.addEventListener('change', renderComparador);

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
    ?.addEventListener("click", function () {
      document.getElementById("dupla-modal").style.display = "none";
    });
  
  const duplaModal = document.getElementById("dupla-modal");
  duplaModal?.addEventListener("click", function (e) {
    if (e.target === this) this.style.display = "none";
  });
  
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modal = document.getElementById("dupla-modal");
      if (modal) modal.style.display = "none";
    }
  }, { once: false });
});
