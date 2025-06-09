function caricaChiamate() {
  fetch('https://script.google.com/macros/s/AKfycbyFp5ILk_ipmbH1DUaw6fFGiKqHMKk9F1GysyEw7PV8qdqyHBVBsSWh7zpR_ALyXGBq/exec')
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => new Date(b["Informazioni cronologiche"]) - new Date(a["Informazioni cronologiche"]));
      const container = document.getElementById("chiamate-container");
      const filtro = document.getElementById("filtro-squadra");

      const squadre = [...new Set(data.map(row => row["Squadra"]))].sort();
      filtro.innerHTML = '<option value="">Tutte</option>';
      squadre.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        filtro.appendChild(opt);
      });

      filtro.onchange = () => render(data);

      function render(dati) {
        const squadra = filtro.value;
        const filtrati = squadra ? dati.filter(r => r["Squadra"] === squadra) : dati;

        container.innerHTML = "";
        if (!filtrati.length) {
          container.innerHTML = "<p>Nessuna chiamata trovata.</p>";
          return;
        }

        filtrati.forEach(row => {
          const card = document.createElement("div");
          card.className = "card-chiamata";
          const dataFormattata = new Date(row["Informazioni cronologiche"]).toLocaleString("it-IT", {
            timeZone: "Europe/Rome",
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
          });
          card.innerHTML = `
            <strong>${row["Squadra"]}</strong> - ${dataFormattata}<br>
            Ha chiamato <strong>${row["Giocatore chiamato"]}</strong><br>
            Al posto di <strong>${row["Giocatore svincolato"]}</strong>
          `;
          container.appendChild(card);
        });
      }

      // Chiamata iniziale
      render(data);
    })
    .catch(err => {
      document.getElementById("chiamate-container").innerHTML = "<p>Errore nel caricamento delle chiamate.</p>";
      console.error(err);
    });
}

// Funzione associata al pulsante Aggiorna
function aggiornaChiamate() {
  document.getElementById("chiamate-container").innerHTML = "Aggiornamento in corso...";
  caricaChiamate();
}
