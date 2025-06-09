function mostraClassifica(tipo) {
  const tabella = classifiche[tipo];
  const contenitore = document.getElementById("contenitore-classifica");
  contenitore.innerHTML = "";
  if (!tabella) {
    contenitore.innerHTML = "<p>Classifica non trovata.</p>";
    return;
  }
  const table = document.createElement("table");
  tabella.forEach((riga, i) => {
    const tr = document.createElement("tr");
    riga.forEach(cell => {
      const td = document.createElement(i === 0 ? "th" : "td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  contenitore.appendChild(table);
}

function aggiornaChiamate() {
  document.getElementById("chiamate-container").innerHTML = "Aggiornamento in corso...";
  caricaChiamate();
}
// aggiornamento per forzare deploy
function mostraRose() {
  const contenitore = document.getElementById("contenitore-rose");
  contenitore.innerHTML = "";

  Object.entries(rose).forEach(([nomeSquadra, giocatori]) => {
    const divSquadra = document.createElement("div");
    divSquadra.className = "team";

    const logo = document.createElement("img");
    logo.src = `loghi/${nomeSquadra}.png`;
    logo.alt = nomeSquadra;
    logo.className = "team-logo";
    divSquadra.appendChild(logo);

    const titolo = document.createElement("h3");
    titolo.textContent = nomeSquadra;
    divSquadra.appendChild(titolo);

    giocatori.forEach(g => {
      const p = document.createElement("div");
      p.className = "player";
      p.textContent = g.nome;

      const badge = document.createElement("span");
      badge.className = `badge ${g.status}`;
      badge.textContent = g.status.toUpperCase();

      p.appendChild(badge);
      divSquadra.appendChild(p);
    });

    contenitore.appendChild(divSquadra);
  });
}
