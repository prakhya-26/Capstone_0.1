from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

scoring = Flask(__name__)
CORS(scoring)

toxicity_model = pipeline(
    "text-classification",
    model="unitary/toxic-bert",
    return_all_scores=True
)

# Simple bias detection logic
BIASED_PHRASES = [
    "all women", "all men", "all girls", "all boys",
    "they always", "they never",
    "those people", "these people",
    "people like you", "your kind"
]

def calculate_bias_score(text):
    text = text.lower()
    score = 0

    for phrase in BIASED_PHRASES:
        if phrase in text:
            score += 20  # each biased phrase adds weight

    return min(score, 100)  # cap at 100


@scoring.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Toxicity score
    result = toxicity_model(text)[0]
    toxicity_score = int(round(
        next(item["score"] for item in result if item["label"] == "toxic") * 100
    ))

    # Bias score
    bias_score = calculate_bias_score(text)

    return jsonify({
        "toxicity_score": toxicity_score,
        "bias_score": bias_score
    })

if __name__ == "__main__":
    scoring.run(debug=True)
