async function testChatbot() {
    const response = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Bagaimana cara melaporkan kekerasan?" })
    });

    const data = await response.json();
    console.log("Chatbot response:", data.response);
}

testChatbot();
