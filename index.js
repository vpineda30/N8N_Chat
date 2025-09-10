const logEl = document.getElementById('log');
const input = document.getElementById('input');
const sendBtn = document.querySelector('.chatInput button');

// Função para adicionar mensagens ao chat
function addMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.classList.add('msg', sender);
  msg.textContent = text;
  logEl.appendChild(msg);
  logEl.scrollTop = logEl.scrollHeight;
}

// Enviar mensagem para o n8n
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Mostra mensagem do usuário
  addMessage(text, 'user');
  input.value = '';

  try {
    // Troque pela URL do seu webhook do n8n
    const response = await fetch("https://pinedalindo.app.n8n.cloud/webhook-test/272afbc9-39e4-408b-92ef-d69e355e9f81", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    // Mostra resposta do n8n
    addMessage(data.reply || "⚠️ Nenhuma resposta do n8n", 'bot');
  } catch (err) {
    addMessage("❌ Erro ao conectar com o servidor", 'bot');
    console.error(err);
  }
}

// Evento do botão
sendBtn.addEventListener('click', sendMessage);

// Evento ao apertar Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});