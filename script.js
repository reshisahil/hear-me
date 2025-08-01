const form = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Function to append messages
function appendMessage(content, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = content;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
}

// Show typing animation
function showTyping() {
  const typing = document.createElement("div");
  typing.id = "typing";
  typing.classList.add("message", "bot");
  typing.textContent = "Agentic AI is typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Remove typing animation
function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage(input, "user");
  userInput.value = "";

  showTyping();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
      }),
    });

    const data = await response.json();
    removeTyping();

    const reply = data.choices?.[0]?.message?.content || "Something went wrong.";
    appendMessage(reply, "bot");
  } catch (error) {
    removeTyping();
    appendMessage("Sorry, the AI is having a rough day. Try again later. 😞", "bot");
  }
});
