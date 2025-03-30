from litellm import completion
from fastapi import FastAPI, Response

app = FastAPI()

def get_response(message):

    system_message = {
    "role": "system",
    "content": "You are an advanced AI assistant specializing in data visualization. Your task is to generate only Python code that utilizes the pandas library for data processing and matplotlib for creating charts and graphs. Always generate fully functional code that can be executed immediately. Include all necessary imports to ensure the code runs without errors and modifications. Do not add any comments or explanations, only return the Python code that is properly formatted. Always use columns that exist in the provided dataset. If the dataset has columns like 'age', 'city', etc., use those exact column names in the code. The code should generate only one chart based on the user's request. Do not generate multiple charts or include code for additional visualizations unless specifically asked for. Maintain consistency in variable names and chart styling unless the user specifies otherwise. If the user requests modifications, adjust the code accordingly without repeating the entire initial prompt. Ensure that the output remains executable after changes.",
    }

    if not message or message[0]["role"] != "system":
        message.insert(0, system_message)
    
    response = completion(
        model="ollama/llama3.2:1b",
        messages=[{"role": "user", "content": message}],
        api_base="http://localhost:11434",
    )
    
    response_data = response.json()
    return response_data["choices"][0]["message"]["content"]

@app.get("/")
def root():
    return {"message": "It works!"}

@app.get("/message/{message}")
async def get_message(message: str):
    print(message)
    return {"message": get_response(message)}