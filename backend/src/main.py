from src.users import router as users_router
from src.graphs import router as graphs_router
from src.docs.docs import description, contact, license_info
from fastapi import FastAPI
from src.users.models import Base
from src.database import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)



app = FastAPI(
    title="Grafos API",
    description=description,
    version="0.0.1",
    contact=contact,
    license_info=license_info,
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router.router, prefix='/api/v1/users')
app.include_router(graphs_router.router, prefix='/api/v1/graphs')