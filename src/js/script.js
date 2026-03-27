document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".membro-card");
    const botoesFiltro = document.querySelectorAll(".btn-filtro");

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

    window.filtrarMembros = function (categoria) {
    cards.forEach((card) => {
        const tipo = card.getAttribute("data-tipo");
        const deveExibir = categoria === "todos" || tipo === categoria;

        card.style.display = deveExibir ? "" : "none";

        if (!deveExibir) card.classList.remove("flipped");

      // Só adiciona .visivel em cards que estavam ESCONDIDOS e voltaram
      // O carregamento inicial fica 100% por conta do Observer
        if (deveExibir && card.style.display !== "none") {
        card.classList.add("visivel");
        }
    });

    botoesFiltro.forEach((btn) => btn.classList.remove("ativo"));
    const btnAtivo = [...botoesFiltro].find((btn) =>
        btn.getAttribute("onclick")?.includes(categoria),
    );
    if (btnAtivo) btnAtivo.classList.add("ativo");
    };

  // CORREÇÃO PRINCIPAL: não chama filtrarMembros("todos") aqui!
  // Só marca o botão ativo — o Observer cuida da animação inicial
    const btnTodos = [...botoesFiltro].find((btn) =>
    btn.getAttribute("onclick")?.includes("todos"),
    );
    if (btnTodos) btnTodos.classList.add("ativo");

    const observerConfig = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
    };

    const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.classList.add("visivel");
        } else {
            entry.target.classList.remove("visivel")
        }
    });
    }, observerConfig);

    cards.forEach((card) => cardObserver.observe(card));
});

// ==================== ANIMAÇÕES SEÇÃO ORIGEM ====================
document.addEventListener("DOMContentLoaded", () => {
    // Animar Timeline Items
    const timelineItems = document.querySelectorAll(".timeline-item");
    const fundadorCards = document.querySelectorAll(".fundador-card");

    const observerConfig = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
    };

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateX(0)";
            }
        });
    }, observerConfig);

    // Adicionar estilos iniciais aos timeline items
    timelineItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transition = `opacity 0.6s ease 0.${index}s, transform 0.6s ease 0.${index}s`;
        
        if (item.classList.contains("timeline-left")) {
            item.style.transform = "translateX(-40px)";
        } else {
            item.style.transform = "translateX(40px)";
        }
        
        elementObserver.observe(item);
    });

    // Adicionar estilos iniciais aos fundador cards
    fundadorCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = `opacity 0.6s ease 0.${index * 0.2}s, transform 0.6s ease 0.${index * 0.2}s`;
        elementObserver.observe(card);
    });

    // Observar manipulador section
    const manipuladorSection = document.querySelector(".manipulador-section");
    if (manipuladorSection) {
        manipuladorSection.style.opacity = "0";
        manipuladorSection.style.transform = "scale(0.95)";
        manipuladorSection.style.transition = "opacity 0.6s ease, transform 0.6s ease 0.2s";
        
        const manipuladorObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "scale(1)";
                }
            });
        }, observerConfig);
        
        manipuladorObserver.observe(manipuladorSection);
    }
});
