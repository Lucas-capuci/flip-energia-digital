<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Footer Harmônico</title>
  <style>
    body {
      margin: 0;
      font-family: 'Open Sans', sans-serif;
    }

    footer {
      background-color: #f9f9f9;
      color: #444;
      text-align: center;
      padding: 20px 10px;
      font-size: 14px;
      border-top: 1px solid #ddd;
    }

    .footer-container {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .footer-company {
      font-weight: 600;
    }

    .footer-project {
      display: inline-block;
      border: 1px solid #ccc;
      padding: 4px 10px;
      border-radius: 6px;
      background-color: #fff;
      font-weight: 500;
      font-size: 13px;
      color: #333;
      margin-top: 6px;
    }

    @media (max-width: 480px) {
      footer {
        font-size: 13px;
        padding: 16px 10px;
      }

      .footer-project {
        font-size: 12px;
        padding: 3px 8px;
      }
    }
  </style>
</head>
<body>

  <footer>
    <div class="footer-container">
      <div class="footer-company">Nome da Empresa - CNPJ: 00.000.000/0001-00</div>
      <div>Rua Exemplo, 123 - Centro - Cidade/UF</div>
      <div class="footer-project">Projeto Nº 2033/2024</div>
    </div>
  </footer>

</body>
</html>
