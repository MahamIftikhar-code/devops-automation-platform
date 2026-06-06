const express = require('express');
const os = require('os');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>DevOps Automation Platform</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #0d0d0d, #1a0533);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 50px;
          max-width: 600px;
          width: 90%;
          text-align: center;
        }
        h1 { color: #a855f7; font-size: 2rem; margin-bottom: 10px; }
        .subtitle { color: rgba(255,255,255,0.5); margin-bottom: 25px; font-size: 0.9rem; }
        .stack {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin: 20px 0;
        }
        .tag {
          background: rgba(168,85,247,0.15);
          border: 1px solid rgba(168,85,247,0.4);
          color: #a855f7;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
        }
        .flow {
          background: rgba(0,0,0,0.3);
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
          text-align: left;
        }
        .flow p {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.88rem;
          color: rgba(255,255,255,0.7);
        }
        .green { color: #00ff88; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>DevOps Automation Platform</h1>
        <p class="subtitle">Infrastructure as Code + Automated CI/CD</p>
        <div class="stack">
          <span class="tag">Terraform</span>
          <span class="tag">Jenkins</span>
          <span class="tag">Docker</span>
          <span class="tag">AWS EC2</span>
          <span class="tag">GitHub</span>
        </div>
        <div class="flow">
          <p>Infrastructure provisioned by Terraform</p>
          <p>Pipeline automated by Jenkins</p>
          <p>App containerized with Docker</p>
          <p>Deployed to AWS EC2</p>
          <p class="green">Live: ${new Date().toLocaleString()}</p>
          <p>Server: ${os.hostname()}</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    infrastructure: 'Terraform',
    pipeline: 'Jenkins',
    time: new Date().toISOString()
  });
});

module.exports = app;