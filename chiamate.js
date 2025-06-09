fetch('https://script.google.com/macros/s/AKfycbyFp5ILk_ipmbH1DUaw6fFGiKqHMKk9F1GysyEw7PV8qdqyHBVBsSWh7zpR_ALyXGBq/exec')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("chiamate-container");
    if (!data.length) {
      container.innerHTML = "<p>Nessuna chiamata visibile al momento.</p>";
      return;
    }

    const table = document.createElement("table");
    table.classList.add("chiamate-table");

    const headers = Object.keys(data[0]);
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headers.forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      headerRow.appendChild(th);
    });

    const tbody = table.createTBody();
    data.forEach(row => {
      const tr = tbody.insertRow();
      headers.forEach(h => {
        const td = tr.insertCell();
        td.textContent = row[h] || "";
      });
    });

    container.innerHTML = "";
    container.appendChild(table);
  })
  .catch(err => {
    document.getElementById("chiamate-container").innerHTML =
      "<p>Errore nel caricamento delle chiamate.</p>";
    console.error(err);
  });
