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
