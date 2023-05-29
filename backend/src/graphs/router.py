import os
from fastapi import APIRouter, File, UploadFile, HTTPException
from src.graphs.service import convert_file_to_json
from src.graphs.schema import ResponseGraphSchema

router = APIRouter()

@router.post("/", name="Convert graph", description="Convert a graph file to json", response_model=ResponseGraphSchema, status_code=200, tags=["Graphs"])
async def convert_graph(file: UploadFile = File(...)):
    file_path = os.path.join("src/temp", file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
        try:
            graph_json = convert_file_to_json(file_path)
            return ResponseGraphSchema(code="success", status="200", message="graph converted successfully", content=graph_json)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    
    

   
