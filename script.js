async function consultar() {
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const loading = document.getElementById('loading');

    // Limpa o conteúdo e esconde mensagens anteriores
    result.innerHTML = "";
    error.innerHTML = "";
    result.classList.remove('active');
    error.classList.remove('active');
    loading.style.display = "block";

    const celular = document.getElementById('celular').value.trim();
    const mes = document.getElementById('mes').value.trim().toLowerCase();

    if (!mes) {
        loading.style.display = "none";
        error.innerHTML = "Por favor, selecione um mês.";
        error.classList.add('active');
        return;
    }

    if (!celular || !mes) {
        loading.style.display = "none";
        error.innerHTML = "Por favor, preencha todos os campos.";
        error.classList.add('active');
        return;
    }

    const url = `https://script.google.com/macros/s/AKfycbxvq6pTYfcHa-jKIFI-Tt5M8a8ENnfQccWGJu3Ulx9f9gR7GaXobV9qxZm_mal4_mYJew/exec?celular=${celular}&mes=${mes}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        loading.style.display = "none";

        if (data.mensagem) {
            result.innerHTML = data.mensagem;
            result.classList.add('active');
        } else if (data.erro) {
            error.innerHTML = data.erro;
            error.classList.add('active');
        } else {
            error.innerHTML = "Erro inesperado na resposta.";
            error.classList.add('active');
        }

    } catch (e) {
        loading.style.display = "none";
        error.innerHTML = "Erro ao consultar, tente novamente mais tarde.";
        error.classList.add('active');
    }
}

// function copiarPix() {
//   const chave = document.getElementById("pix-chave").innerText;
//   navigator.clipboard.writeText(chave).then(() => {
//     alert("Chave Pix copiada!");
//   }).catch(() => {
//     alert("Erro ao copiar. Tente manualmente.");
//   });
// }

function copiarPix() {
  const chave = document.getElementById("pix-chave").innerText;
  navigator.clipboard.writeText(chave).then(() => {
    const msg = document.getElementById("copiado-msg");
    msg.style.display = "block";
    msg.style.opacity = "1";

    setTimeout(() => {
      msg.style.display = "none";
    }, 3000);
  }).catch(() => {
    document.getElementById("error").innerHTML = "Erro ao copiar. Tente manualmente.";
  });
}