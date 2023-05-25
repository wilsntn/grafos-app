from typing import Generic, Optional, TypeVar, List
from pydantic import BaseModel
from pydantic.generics import GenericModel

T = TypeVar('T')


class GraphNode(BaseModel):
    id: int
    label: str

class GraphEdge(BaseModel):
    source: int
    target: int

class GraphSchema(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

class ResponseGraphSchema(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    content: Optional[T] = None
