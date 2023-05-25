from typing import Generic, Optional, TypeVar
from pydantic import BaseModel, Field
from pydantic.generics import GenericModel

T = TypeVar('T')


class UserSchema(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    password: str

    class Config:
        orm_mode = True


class RequestUserSchema(BaseModel):
    params: UserSchema = Field(..., description='User data')


class UserResponseSchema(BaseModel):
    id: Optional[int] = None
    username: str
    email: str

    class Config:
        orm_mode = True


class ResponseUserSchema(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T] = None
