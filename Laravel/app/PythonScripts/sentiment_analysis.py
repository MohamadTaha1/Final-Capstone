import sys
import json
from transformers import pipeline

def analyze_sentiment(text):
    sent_pipeline = pipeline("sentiment-analysis")
    result = sent_pipeline(text)
    return result

if __name__ == "__main__":
    input_text = sys.argv[1]
    sentiment_result = analyze_sentiment(input_text)
    print(json.dumps(sentiment_result))

