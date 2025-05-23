import io
import traceback
from litellm import completion
from fastapi import FastAPI, Response, status, Depends
from sqlalchemy.orm import Session
import matplotlib.pyplot as plt
from . import schema, model
from .database import engine, get_db

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_response(message):

    system_message = {
    "role": "system",
    "content": "You are an advanced AI assistant specializing in data visualization. Your task is to generate only Python code that utilizes the pandas library for data processing and matplotlib for creating charts and graphs. Always generate fully functional code that can be executed immediately. Include all necessary imports to ensure the code runs without errors and modifications. Do not add any comments or explanations, only return the Python code that is properly formatted. Always use columns that exist in the provided dataset. If the dataset has columns like 'age', 'city', etc., use those exact column names in the code. The code should generate only one chart based on the user's request. Do not generate multiple charts or include code for additional visualizations unless specifically asked for. Maintain consistency in variable names and chart styling unless the user specifies otherwise. If the user requests modifications, adjust the code accordingly without repeating the entire initial prompt. Ensure that the output remains executable after changes.",
    }
    # print("======================")
    # print(message)
    # print("======================")
    if not message or message[0]["role"] != "system":
        message.insert(0, system_message)
    
    response = completion(
        # model="ollama/llama3.2:1b"
        model="ollama/qwen2.5-coder:7b",
        # model="ollama/llama3.1",
        messages= message,
        api_base="http://localhost:11434",
    )
    
    response_data = response.json()
    return response_data["choices"][0]["message"]["content"]

def extract_code_block(response_content):
    if "```python" in response_content:
        return response_content.split("```python")[1].split("```")[0].strip()
    elif "```" in response_content:
        return response_content.split("```")[1].split("```")[0].strip()
    return ""

@app.get("/")
def root():
    return {"message": "It works!"}

@app.get("/message/{message}")
async def get_message(message: str):
    print(message)
    return {"message": get_response([{"role": "user", "content": message}])}

@app.get("/executecode/{code}")
async def execute_code(code: str, response: Response):
    try:
        # print("Executing code...")
        # print(code)
        # print("Executing code...")
        local_vars = {}
        clean_code = extract_code_block(code).replace("\\n", "\n")
        print("Clean code:")
        print(clean_code)
        print("Clean code:")
        exec(clean_code, globals(), local_vars)  # Execute code
        buffer = io.BytesIO()
        plt.savefig(buffer, format="png")
        buffer.seek(0)
        plt.close()
        # buffer.getvalue() when we want to return plot as an image, local_vars.get('result', 'No output variable defined')
        if buffer.getvalue():
            return Response(content=buffer.getvalue(), media_type="image/png")
        
        result = local_vars.get('result', 'No output variable defined')
        return {"result": result}
    except Exception as e:
        response.status_code = 500
        return {"error": traceback.format_exc()}

@app.post("/register/", status_code=status.HTTP_201_CREATED)
async def register_user(user: schema.User, db: Session = Depends(get_db)):
    # should we encrypt password here? or in the frontend?
    # hashed_password = utils.hash(user.password)
    # user.password = hashed_password

    new_user = model.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    # should we return the user object? or just boolean?
    return new_user

@app.get("/login/{email}/{password}")
async def login_user(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.email == email).first()
    if not user:
        return {"error": "User not found"}
    
    if user.password != password:
        return {"error": "Invalid password"}
    
    return {"message": "Login successful", "user": user}

@app.post("/changepassword/{email}/{password}")
async def change_password(email: str, password: str, db: Session = Depends(get_db)):
    # should we encrypt password here? or in the frontend?
    # hashed_password = utils.hash(user.password)
    # user.password = hashed_password

    user = db.query(model.User).filter(model.User.email == email).first()
    if not user:
        return {"error": "User not found"}
    
    user.password = password
    db.commit()
    db.refresh(user)
    return user

@app.delete("/delete/{email}")
async def delete_user(email: str, db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.email == email).first()
    if not user:
        return {"error": "User not found"}
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

@app.get("/getuser/{email}")
async def get_user(email: str, db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.email == email).first()
    if not user:
        return {"error": "User not found"}
    
    return user