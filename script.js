document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "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"; // your OpenRouter API key
  const chatLog = document.getElementById("chat-log");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = text;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // you can use other free models listed on OpenRouter
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();
      console.log(data);

      const reply =
        data?.choices?.[0]?.message?.content || "I'm here for you ❤️";
      appendMessage("ai", reply);
    } catch (error) {
      console.error("Error:", error);
      appendMessage("ai", "Sorry, something went wrong 😢");
    }
  }
});
