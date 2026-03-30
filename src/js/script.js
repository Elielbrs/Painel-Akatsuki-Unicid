document.addEventListener("DOMContentLoaded", () => {

    // ── Seletores ─────────────────────────────────────────────
    const cards        = document.querySelectorAll(".membro-card");
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const linksNav     = document.querySelectorAll(".nav-bar nav a");
    const secoes       = document.querySelectorAll("section[id]");


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
            const tipo       = card.getAttribute("data-tipo");
            const deveExibir = categoria === "todos" || tipo === categoria;

            card.style.display = deveExibir ? "" : "none";

            if (!deveExibir) card.classList.remove("flipped");
            if (deveExibir)  card.classList.add("visivel");
        });

        botoesFiltro.forEach((btn) => btn.classList.remove("ativo"));
        const btnAtivo = [...botoesFiltro].find(
            (btn) => btn.getAttribute("onclick")?.includes(categoria)
        );
        if (btnAtivo) btnAtivo.classList.add("ativo");
    };

    const btnTodos = [...botoesFiltro].find(
        (btn) => btn.getAttribute("onclick")?.includes("todos")
    );
    if (btnTodos) btnTodos.classList.add("ativo");


    // ════════════════════════════════════════════════════════
    // 3. ANIMAÇÃO DE ENTRADA DOS CARDS (Intersection Observer)
    // ════════════════════════════════════════════════════════
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visivel");
            } else {
                entry.target.classList.remove("visivel");
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

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
            (link) => link.getAttribute("href") === `#${id}`
        );
        if (linkAtivo) linkAtivo.classList.add("nav-ativa");
    };

    const scrollspyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                ativarLinkNav(entry.target.id);
            }
        });
    }, {
        threshold: 0,
        rootMargin: "-15% 0px -80% 0px"
    });

    secoes.forEach((secao) => scrollspyObserver.observe(secao));


    // ════════════════════════════════════════════════════════
    // 5. ANIMAÇÕES DA SEÇÃO ORIGEM
    // ════════════════════════════════════════════════════════
    const origemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = "1";
                entry.target.style.transform = "translate(0, 0) scale(1)";
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".timeline-item").forEach((item, index) => {
        item.style.opacity    = "0";
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        item.style.transform  = item.classList.contains("timeline-left")
            ? "translateX(-40px)"
            : "translateX(40px)";
        origemObserver.observe(item);
    });

    document.querySelectorAll(".fundador-card").forEach((card, index) => {
        card.style.opacity    = "0";
        card.style.transform  = "translateY(30px)";
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        origemObserver.observe(card);
    });

    const manipulador = document.querySelector(".manipulador-section");
    if (manipulador) {
        manipulador.style.opacity    = "0";
        manipulador.style.transform  = "scale(0.95)";
        manipulador.style.transition = "opacity 0.6s ease, transform 0.6s ease 0.2s";
        origemObserver.observe(manipulador);
    }


    // ════════════════════════════════════════════════════════
    // 6. FLIP CARDS DOS OBJETIVOS
    // ════════════════════════════════════════════════════════
    const objetivoCards = document.querySelectorAll(".objetivo-card");
    
    objetivoCards.forEach((card) => {
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
    // 7. ANIMAÇÃO DE ENTRADA DOS CARDS DE OBJETIVOS
    // ════════════════════════════════════════════════════════
    const objetivoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    objetivoCards.forEach((card) => {
        objetivoObserver.observe(card);
    });

});

