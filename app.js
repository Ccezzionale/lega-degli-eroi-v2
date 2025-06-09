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

function getLogoHtml(nomeSquadra) {
  const file = {
    "Team Bartowski": "Team Bartowski.png",
    "Rubin Kebab": "Rubinkebab.png",
    "wildboys78": "wildboys78.png",
    "Desperados": "Desperados.png",
    "MinneSota Snakes": "MinneSota Snakes.png",
    "PokerMantra": "PokerMantra.png",
    "Bayern Christiansen": "Bayern Christiansen.png",
    "Minnesode Timberland": "Minnesode Timberland.png",
    "Sharknado 04": "Sharknado 04.png",
    "Real Mimmo": "Real Mimmo.png",
    "Giody": "Giody.png",
    "Ibla": "Ibla.png",
    "Pandinicoccolosini": "Pandinicoccolosini.png",
    "Giulay": "Giulay.png"
  }[nomeSquadra];
  return file ? `<img src="loghi/${file}" class="team-logo" alt="logo">` : "";
}

function mostraRosa(squadra) {
  const contenitore = document.getElementById("contenitore-rose");
  contenitore.innerHTML = "";

  const rosa = rose[squadra];
  if (!rosa) {
    contenitore.innerHTML = "<p>Rosa non trovata.</p>";
    return;
  }

  const teamDiv = document.createElement("div");
  teamDiv.className = "team";

  const title = document.createElement("h2");
  title.innerHTML = getLogoHtml(squadra) + squadra;
  teamDiv.appendChild(title);

  rosa.forEach(player => {
    const div = document.createElement("div");
    div.className = "player";
    let badge = "";
    if (player.status === "fp") badge = '<span class="badge fp">FP</span>';
    else if (player.status === "u21") badge = '<span class="badge u21">U21</span>';
    else if (player.status === "fp+u21") badge = '<span class="badge both">FP+U21</span>';
    div.innerHTML = `${player.nome} ${badge}`;
    teamDiv.appendChild(div);
  });

  contenitore.appendChild(teamDiv);
}

// Avvia bottoni rose al caricamento
window.addEventListener("DOMContentLoaded", () => {
  const bottoniContainer = document.getElementById("contenitore-bottoni");
  Object.keys(rose).forEach(squadra => {
    const btn = document.createElement("button");
    btn.innerHTML = getLogoHtml(squadra) + squadra;
    btn.onclick = () => mostraRosa(squadra);
    bottoniContainer.appendChild(btn);
  });
});
