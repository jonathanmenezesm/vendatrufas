async function consultar() {
    // Limpar resultados anteriores
    document.getElementById('result').innerHTML = "";
    document.getElementById('error').innerHTML = "";

    const celular = document.getElementById('celular').value.trim();
    const mes = document.getElementById('mes').value.trim().toLowerCase();

    // Validar entradas
    if (!celular || !mes) {
        document.getElementById('error').innerHTML = "Por favor, preencha todos os campos.";
        return;
    }

    // Exibir indicador de carregamento
    document.getElementById('result').innerHTML = "Consultando...";

    // Construir URL de consulta
    const url = `https://script.google.com/macros/s/AKfycbwYmSuxB40nV-AIcNR5HetfUzNHUA5jlpRUpmIOklFYCJN1dzoSgqnApy0JJMOD8PYpMw/exec?celular=${celular}&mes=${mes}`;

    try {
        // Fazer a consulta na API
        const response = await fetch(url);
        const data = await response.json();

        // Verificar se a API retornou mensagem ou erro
        if (data.mensagem) {
            document.getElementById('result').innerHTML = data.mensagem;
        } else if (data.erro) {
            document.getElementById('error').innerHTML = data.erro;
            document.getElementById('result').innerHTML = ""; // Limpar o indicador de carregamento
        }
    } catch (error) {
        // Em caso de erro na requisição
        document.getElementById('error').innerHTML = "Erro ao consultar, tente novamente mais tarde.";
        document.getElementById('result').innerHTML = ""; // Limpar o indicador de carregamento
    }
}