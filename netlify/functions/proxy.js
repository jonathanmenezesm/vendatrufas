// Netlify Function: proxy para o Google Apps Script
// Recebe query params (celular, mes) e repassa para o Web App do Apps Script
// Retorna a resposta original adicionando cabeçalhos CORS

exports.handler = async (event, context) => {
  // Responder preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS'
      },
      body: ''
    };
  }

  const params = event.queryStringParameters || {};
  const celular = params.celular || '';
  const mes = params.mes || '';

  console.log('Parâmetros recebidos:', { celular, mes });

  // Substitua pela sua URL do Apps Script se precisar
  const appsScriptUrl = `https://script.google.com/macros/s/AKfycbwYmSuxB40nV-AIcNR5HetfUzNHUA5jlpRUpmIOklFYCJN1dzoSgqnApy0JJMOD8PYpMw/exec?celular=${encodeURIComponent(celular)}&mes=${encodeURIComponent(mes)}`;

  try {
    // Node 18+ em Netlify Functions tem fetch global disponível
    console.log('Fazendo fetch para Apps Script:', appsScriptUrl);
    const res = await fetch(appsScriptUrl);
    console.log('Status da resposta do Apps Script:', res.status);
    const text = await res.text();
    console.log('Resposta do Apps Script:', text);

    // Repasse do status do Apps Script não é crítico aqui; retornamos 200 com o body
    return {
      statusCode: 200,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ erro: 'Erro ao acessar o serviço remoto.' })
    };
  }
};
