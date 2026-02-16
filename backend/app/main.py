from fastapi import FastAPI

from .routes import auth, posts, ai
from .database import engine, Base

app = FastAPI(title="Clariox AI API")

# Create tables automatically
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(posts.router)
app.include_router(ai.router)


@app.get("/")
def root():
    return {"message": "Clariox AI Backend Running"}
