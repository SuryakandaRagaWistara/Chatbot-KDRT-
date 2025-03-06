async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    let chatBox = document.getElementById("chat-box");

    // Tambahkan pesan user ke chatbox
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Kirim ke API Flask
    let response = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    });

    let data = await response.json();

    // Tambahkan respons bot ke chatbox
    let botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    botMessage.textContent = data.response;
    chatBox.appendChild(botMessage);

    // Bersihkan input
    document.getElementById("user-input").value = "";

    // Scroll ke bawah
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Fungsi untuk menangani enter key
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
