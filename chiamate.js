function caricaChiamate() {
  fetch('https://script.google.com/macros/s/AKfycbyFp5ILk_ipmbH1DUaw6fFGiKqHMKk9F1GysyEw7PV8qdqyHBVBsSWh7zpR_ALyXGBq/exec')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("chiamate-container");
      const filtro = document.getElementById("filtro-squadra");

      // Popola il filtro una sola volta se vuoto
      if (filtro.options.length <= 1) {
        const squadre = [...new Set(data.map(row => row["Squadra"]))].sort();
        squadre.forEach(s => {
          const opt = document.createElement("option");
          opt.value = s;
          opt.textContent = s;
          filtro.appendChild(opt);
        });

        filtro.addEventListener("change", () => render(data));
      }

      render(data);

      function render(dati) {
        const squadra = filtro.value;
        const filtrati = squadra ? dati.filter(r => r["Squadra"] === squadra) : dati;

        container.innerHTML = "";
        if (!filtrati.length) {
          container.innerHTML = "<p>Nessuna chiamata trovata.</p>";
          return;
        }

        // Crea tabella
        const table = document.createElement("table");
        table.innerHTML = `
          <tr>
            <th>Data</th>
            <th>Squadra</th>
            <th>Giocatore chiamato</th>
            <th>Giocatore svincolato</th>
          </tr>
        `;

        filtrati.forEach(row => {
          const tr = document.createElement("tr");
          const dataLocale = new Date(row["Informazioni cronologiche"]).toLocaleString("it-IT", {
            timeZone: "Europe/Rome",
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
          });

          tr.innerHTML = `
            <td>${dataLocale}</td>
            <td>${row["Squadra"]}</td>
            <td>${row["Giocatore chiamato"]}</td>
            <td>${row["Giocatore svincolato"]}</td>
          `;
          table.appendChild(tr);
        });

        container.appendChild(table);
      }
    })
    .catch(err => {
      document.getElementById("chiamate-container").innerHTML = "<p>Errore nel caricamento delle chiamate.</p>";
      console.error(err);
    });
}

function aggiornaChiamate() {
  document.getElementById("chiamate-container").innerHTML = "Aggiornamento in corso...";
  caricaChiamate();
}

// ⚠️ Carica le chiamate al primo caricamento della pagina
window.addEventListener("DOMContentLoaded", caricaChiamate);
