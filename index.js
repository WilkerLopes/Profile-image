const express = require("express");
const app = express();
const generate = require("./images.js");

const getHTML = (iniciais, gradient) => `
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">
    <style>
    body {
      overflow: hidden;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Nunito;
      font-size: 40vw;
      line-height: 30vw;
      font-weight: 700;
      text-transform: uppercase;
      text-rendering: optimizeLegibility;
      color: #fff;
      text-shadow: -0.2vw -0.2vw 0.2vw rgba(255, 255, 255, 0.1), 0.2vw 0.2vw 0.2vw rgba(68, 68, 68, 0.5);
      background-image: linear-gradient(${gradient.range}, ${gradient.start}, ${gradient.finish});
    }
    </style>
</head>
<body>
    ${iniciais}
</body>
</html>
`;

app.get("/profile/:iniciais", async(req, res) => {
    const isHTMLDebugMode = false;
    const html = getHTML(req.params.iniciais, {
        range: "20deg",
        start: "#d40d12",
        finish: "#870408",
    });

    if (isHTMLDebugMode) {
        res.setHeader("Content-Type", "text/html");
        return res.end(html);
    }

    const file = await generate.image(html, { width: 256, height: 256 });

    res.setHeader("Content-Type", "image/png");
    res.end(file);
});

app.get("/producer/:iniciais", async(req, res) => {
    const isHTMLDebugMode = false;
    const html = getHTML(req.params.iniciais, {
        range: "20deg",
        start: "#2292D4",
        finish: "#0DD441",
    });

    if (isHTMLDebugMode) {
        res.setHeader("Content-Type", "text/html");
        return res.end(html);
    }

    const file = await generate.image(html, { width: 256, height: 256 });

    res.setHeader("Content-Type", "image/png");
    res.end(file);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("O servidor padrao esta rodando na porta : " + port);
});