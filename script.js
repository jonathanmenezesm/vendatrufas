async function consultar() {
  document.getElementById('result').innerHTML = "";
  document.getElementById('error').innerHTML = "";

  const celular = document.getElementById('celular').value.trim();
  const mes = document.getElementById('mes').value.trim().toLowerCase();

  const celularRegex = /^[0-9]{10,11}$/;
  const mesesValidos = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];

  if (!celular || !mes) {
    document.getElementById('error').innerHTML = "Por favor, preencha todos os campos.";
    return;
  }

  if (!celularRegex.test(celular)) {
    document.getElementById('error').innerHTML = "Digite um número de celular válido (somente números, com DDD).";
    return;
  }

  if (!mesesValidos.includes(mes)) {
    document.getElementById('error').innerHTML = "Selecione um mês válido.";
    return;
  }

  document.getElementById('loading').style.display = "block";

  // Se estiver usando Netlify Functions como proxy:
  // const url = `/.netlify/functions/proxy?celular=${celular}&mes=${mes}`;

  // Se quiser usar direto o Apps Script, substitua por:
  const url = `https://script.google.com/macros/s/AKfycbxpa-ZCZxlrMUjiTKteQ0ETmxnlZr3iDpTH-S7TOv5mRlcXiiXz9ywP0z-MI34-R5YguA/exec?celular=${celular}&mes=${mes}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById('loading').style.display = "none";

    if (data.mensagem) {
      document.getElementById('result').innerHTML = `<p class="sucesso">${data.mensagem}</p>`;
    } else if (data.erro) {
      document.getElementById('error').innerHTML = `<p class="erro">${data.erro}</p>`;
    } else {
      document.getElementById('error').innerHTML = "Erro inesperado na resposta.";
    }
  } catch (error) {
    document.getElementById('loading').style.display = "none";
    document.getElementById('error').innerHTML = "Erro ao consultar, tente novamente mais tarde.";
  }
}