async function consultar() {
    document.getElementById('result').innerHTML = "";
    document.getElementById('error').innerHTML = "";
    document.getElementById('loading').style.display = "block";

    const celular = document.getElementById('celular').value.trim();
    const mes = document.getElementById('mes').value.trim().toLowerCase();

    if (!mes) {
        document.getElementById('error').innerHTML = "Por favor, selecione um mês.";
        return;
    }


    if (!celular || !mes) {
        document.getElementById('error').innerHTML = "Por favor, preencha todos os campos.";
        document.getElementById('loading').style.display = "none";
        return;
    }

    const url = `https://script.google.com/macros/s/AKfycbwYmSuxB40nV-AIcNR5HetfUzNHUA5jlpRUpmIOklFYCJN1dzoSgqnApy0JJMOD8PYpMw/exec?celular=${celular}&mes=${mes}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById('loading').style.display = "none";

        if (data.mensagem) {
            document.getElementById('result').innerHTML = data.mensagem;
        } else if (data.erro) {
            document.getElementById('error').innerHTML = data.erro;
        } else {
            document.getElementById('error').innerHTML = "Erro inesperado na resposta.";
        }
    } catch (error) {
        document.getElementById('loading').style.display = "none";
        document.getElementById('error').innerHTML = "Erro ao consultar, tente novamente mais tarde.";
    }
}