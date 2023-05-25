from src.users import router as users_router
from src.graphs import router as graphs_router
from src.docs.docs import description, contact, license_info
from fastapi import FastAPI
from src.users.models import Base
from src.database import engine

Base.metadata.create_all(bind=engine)



app = FastAPI(
    title="Grafos API",
    description=description,
    version="0.0.1",
    contact=contact,
    license_info=license_info,
)


app.include_router(users_router.router, prefix='/api/v1/users')
app.include_router(graphs_router.router, prefix='/api/v1/graphs')
