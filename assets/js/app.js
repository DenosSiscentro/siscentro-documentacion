document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#searchInput");
    const manualGrid = document.querySelector("#manualGrid");
    const searchFeedback = document.querySelector("#searchFeedback");

    if (searchInput && manualGrid) {
        const cards = [...manualGrid.querySelectorAll(".manual-card")];

        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim().toLocaleLowerCase("es");
            let visible = 0;

            cards.forEach(card => {
                const content = (
                    card.innerText + " " + (card.dataset.search || "")
                ).toLocaleLowerCase("es");

                const matches = content.includes(query);

                card.hidden = !matches;

                if (matches) visible++;
            });

            let message = manualGrid.querySelector(".no-results");

            if (visible === 0) {
                if (!message) {
                    message = document.createElement("p");
                    message.className = "no-results";
                    message.textContent =
                        "No hemos encontrado resultados. Prueba con otras palabras.";

                    manualGrid.appendChild(message);
                }
            } else if (message) {
                message.remove();
            }

            if (searchFeedback) {
                searchFeedback.textContent = query
                    ? `${visible} resultados encontrados`
                    : "";
            }
        });
    }
});
