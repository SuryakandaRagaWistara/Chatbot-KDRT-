from flask import Flask, request, jsonify, render_template
import pickle
import re
import string

app = Flask(__name__)

# Load model dan vectorizer
with open("chatbot_kekerasan.pkl", "rb") as file:
    model = pickle.load(file)

with open("vectorizer.pkl", "rb") as file:
    vectorizer = pickle.load(file)

# Fungsi membersihkan teks
def clean_text(text):
    text = text.lower()
    text = re.sub(f"[{string.punctuation}]", "", text)
    return text

# Endpoint untuk tampilan web
@app.route("/")
def home():
    return render_template("index.html")

# Endpoint API chatbot
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json
    user_input = data.get("message", "").strip().lower()
    
    # Jika user mengucapkan "hallo"
    if user_input in ["hallo", "halo", "hi", "hey"]:
        response = "Hallo juga! Ada yang bisa saya bantu?"
    else:
        # Bersihkan teks sebelum diproses oleh model
        user_input = clean_text(user_input)
        user_vector = vectorizer.transform([user_input])
        response = model.predict(user_vector)[0]

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
