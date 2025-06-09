console.log("📡 chiamate.js caricato e in esecuzione");

function caricaChiamate() {
  console.log("↻ caricaChiamate avviata");

  fetch('https://script.google.com/macros/s/AKfycbyFp5ILk_ipmbH1DUaw6fFGiKqHMKk9F1GysyEw7PV8qdqyHBVBsSWh7zpR_ALyXGBq/exec')
    .then(res => res.json())
    .then(data => {
      console.log("✅ Dati ricevuti:", data);

      // Ordina per data decrescente
      data.sort((a, b) => new Date(b["Informazioni cronologiche"]) - new Date(a["Informazioni cronologiche"]));

      const container = document.getElementById("chiamate-container");
      const filtro = document.getElementById("filtro-squadra");

      // Popola il filtro con le squadre
      const squadre = [...new Set(data.map(r => r["Squadra"]))].sort();
      filtro.innerHTML = '<option value="">Tutte</option>';
      squadre.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        filtro.appendChild(opt);
      });

      filtro.onchange = () => render(data);

      // Funzione di rendering tabella
      function render(dati) {
        const squadra = filtro.value;
        const filtrati = squadra ? dati.filter(r => r["Squadra"] === squadra) : dati;

        container.innerHTML = "";
        if (!filtrati.length) {
          container.innerHTML = "<p>Nessuna chiamata trovata.</p>";
          return;
        }

        const table = document.createElement("table");
        const header = document.createElement("tr");
        ["Data", "Squadra", "Giocatore chiamato", "Giocatore svincolato"].forEach(text => {
          const th = document.createElement("th");
          th.textContent = text;
          header.appendChild(th);
        });
        table.appendChild(header);

        filtrati.forEach(r => {
          const tr = document.createElement("tr");
          const dataFormattata = new Date(r["Informazioni cronologiche"]).toLocaleString("it-IT", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
          });

          [dataFormattata, r["Squadra"], r["Giocatore chiamato"], r["Giocatore svincolato"]].forEach(val => {
            const td = document.createElement("td");
            td.textContent = val;
            tr.appendChild(td);
          });

          table.appendChild(tr);
        });

        container.appendChild(table);
      }

      render(data);
    })
    .catch(err => {
      console.error("❌ Errore nel caricamento chiamate:", err);
      document.getElementById("chiamate-container").innerHTML = "<p>Errore nel caricamento delle chiamate.</p>";
    });
}
