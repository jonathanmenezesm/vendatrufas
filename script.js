async function consultar() {
  document.getElementById('result').innerHTML = "";
  document.getElementById('error').innerHTML = "";

  const celular = document.getElementById('celular').value.trim();
  const mes = document.getElementById('mes').value.trim().toLowerCase();

  if (!mes) {
  document.getElementById('error').innerHTML = "Por favor, selecione um mês.";
  return;
  }

  const celularRegex = /^[0-9]{10,11}$/;
  const mesesValidos = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

  if (!celular || !mes) {
    document.getElementById('error').innerHTML = "Por favor, preencha todos os campos.";
    return;
  }

  if (!celularRegex.test(celular)) {
    document.getElementById('error').innerHTML = "Digite um número de celular válido (somente números, com DDD).";
    return;
  }

  if (!mesesValidos.includes(mes)) {
    document.getElementById('error').innerHTML = "Digite um mês válido (ex: novembro).";
    return;
  }

  document.getElementById('loading').style.display = "block";

  // Use a função Netlify como proxy para evitar CORS
  // A função está em netlify/functions/proxy.js e repassa a requisição ao Apps Script
  const url = `/.netlify/functions/proxy?celular=${celular}&mes=${mes}`;

  try {
    console.log('Iniciando fetch para:', url);
    const response = await fetch(url);
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Dados recebidos:', data);

    document.getElementById('loading').style.display = "none";

    if (data.mensagem) {
      document.getElementById('result').innerHTML = `<p class="sucesso">${data.mensagem}</p>`;
    } else if (data.erro) {
      document.getElementById('error').innerHTML = `<p class="erro">${data.erro}</p>`;
    } else {
      document.getElementById('error').innerHTML = "Erro inesperado na resposta.";
    }
  } catch (error) {
    console.error('Erro na consulta:', error);
    document.getElementById('loading').style.display = "none";
    document.getElementById('error').innerHTML = "Erro ao consultar, tente novamente mais tarde.";
  }
}
