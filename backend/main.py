from fastapi import FastAPI
from starlette_graphene3 import GraphQLApp
from starlette.middleware.cors import CORSMiddleware
from schemas.ProjectSchema import schema

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "ok"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_route("/graphql", GraphQLApp(schema=schema, playground=True))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)