<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Albo d'Oro</title>
  <style>
    body {
      font-family: sans-serif;
      background: #f9f9f9;
      padding: 20px;
    }
    .season {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 16px;
      margin-bottom: 20px;
    }
    h2 {
      margin-top: 0;
    }
    .competition {
      margin-top: 10px;
    }
    .competition h3 {
      margin-bottom: 4px;
    }
    .podio span {
      display: block;
      margin-left: 10px;
    }
  </style>
</head>
<body>
  <h1>🏆 Albo d'Oro</h1>
  <div id="albo"></div>

  <script type="module">
    import { alboDoro } from './albo_doro.js';

    const container = document.getElementById('albo');

    Object.entries(alboDoro).forEach(([anno, competizioni]) => {
      const season = document.createElement('div');
      season.className = 'season';

      const title = document.createElement('h2');
      title.textContent = `Stagione ${anno}`;
      season.appendChild(title);

      Object.entries(competizioni).forEach(([nome, podio]) => {
        const comp = document.createElement('div');
        comp.className = 'competition';

        const compTitle = document.createElement('h3');
        compTitle.textContent = nome;
        comp.appendChild(compTitle);

        const podioDiv = document.createElement('div');
        podioDiv.className = 'podio';

        ['🥇', '🥈', '🥉'].forEach((medaglia, idx) => {
          const squadra = podio[idx] || '-';
          const span = document.createElement('span');
          span.textContent = `${medaglia} ${squadra}`;
          podioDiv.appendChild(span);
        });

        comp.appendChild(podioDiv);
        season.appendChild(comp);
      });

      container.appendChild(season);
    });
  </script>
</body>
</html>
