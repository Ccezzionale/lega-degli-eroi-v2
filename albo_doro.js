const alboDoro = {
  "2024-25": {
    "Conference Championship": ["wildboys78", "Ibla", "MinneSota Snakes"],
    "Conference League": ["Rubinkebab", "Giuly", "Bayern Christiansen"]
  },
  "2023-24": {
    "Conference Championship": ["Ibla", "Team Bartowski", "Desperados"],
    "Conference League": ["Pandinicoccolosini", "Giody", "Rubinkebab"]
  }
};

const logoPath = "loghi/";
const squadreConLogo = {
  "MinneSota Snakes": "MinneSota Snakes.png",
  "Pandinicoccolosini": "Pandinicoccolosini.png",
  "Rubinkebab": "Rubinkebab.png",
  "Team Bartowski": "Team Bartowski.png",
  "wildboys78": "wildboys78.png",
  "Bayern Christiansen": "Bayern Christiansen.png",
  "Desperados": "Desperados.png",
  "Giody": "Giody.png",
  "Giulay": "Giulay.png",
  "Ibla": "Ibla.png",
  "Minnesode Timberland": "Minnesode Timberland.png"
};

function getLogoHtml(nomeSquadra) {
  const file = squadreConLogo[nomeSquadra];
  if (file) {
    return `<img src="${logoPath + file}" alt="logo" class="team-logo">`;
  }
  return "";
}

const containerAlbo = document.getElementById("contenitore-albo");
Object.entries(alboDoro).forEach(([anno, competizioni]) => {
  const section = document.createElement("div");
  section.className = "team";
  const title = document.createElement("h2");
  title.textContent = `Stagione ${anno}`;
  section.appendChild(title);

  Object.entries(competizioni).forEach(([nome, podio]) => {
    const comp = document.createElement("div");
    const compTitle = document.createElement("h3");
    compTitle.textContent = nome;
    comp.appendChild(compTitle);

    const podioDiv = document.createElement("div");
    ["🥇", "🥈", "🥉"].forEach((medaglia, i) => {
      const span = document.createElement("p");
      span.innerHTML = `${medaglia} ${getLogoHtml(podio[i])}${podio[i] || '-'}`;
      podioDiv.appendChild(span);
    });

    comp.appendChild(podioDiv);
    section.appendChild(comp);
  });

  containerAlbo.appendChild(section);
});
