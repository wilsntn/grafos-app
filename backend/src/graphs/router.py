from fastapi import APIRouter, File, UploadFile, HTTPException
from src.graphs.service import convert_file_to_json
from src.graphs.schema import ResponseGraphSchema
import tempfile

router = APIRouter()

@router.post("/", name="Convert graph", description="Convert a graph file to json", response_model=ResponseGraphSchema, status_code=200, tags=["Graphs"])
async def convert_graph(file: UploadFile = File(...)):

    if not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="the file must be a txt.")
    
    with tempfile.NamedTemporaryFile() as temp_file:
        temp_file.write(await file.read())
        temp_file.seek(0)

        try: 
            graph_json = convert_file_to_json(temp_file.file)
            return ResponseGraphSchema(code="success", status="200", message="graph converted successfully", content=graph_json)
        except Exception as e:
            raise HTTPException(status_code=400, detail="invalid graph file")
