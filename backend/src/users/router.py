from fastapi import APIRouter, HTTPException, Path, Depends
from src.database import SessionLocal
from sqlalchemy.orm import Session
from src.users.schema import UserResponseSchema, UserSchema, RequestUserSchema, ResponseUserSchema
import src.users.service as service

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post('/create', name="Create user", status_code=201, response_model=UserResponseSchema, tags=["Users"], description="Create a user")
async def create_user(user: RequestUserSchema, db: Session = Depends(get_db)):
    _user = service.create_user(db, user.params)
    return ResponseUserSchema(code='200', status='success', message='User created', result=_user)


@router.get('/', name="List users", response_model=ResponseUserSchema, tags=["Users"], description="Get a list of users")
async def get_user(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    _users = service.get_users(db, skip, limit)
    response_users = [UserSchema.from_orm(user) for user in _users]
    for user in response_users:
        user.password = None  # type: ignore
    return ResponseUserSchema(code='200', status='success', message='User list', result=response_users)


@router.get('/{user_id}', name="User by Id", response_model=ResponseUserSchema, tags=["Users"], description="Get a user by id")
async def get_user_by_id(user_id: int = Path(..., description='User id'), db: Session = Depends(get_db)):
    _user = service.get_user_by_id(db, user_id)
    if not _user:
        raise HTTPException(status_code=404, detail='User not found')
    return ResponseUserSchema(code='200', status='success', message='User detail', result=_user)


@router.post('/update/{user_id}', name="Update", response_model=ResponseUserSchema, tags=["Users"], description="Update a user")
async def update_user(user: RequestUserSchema, db: Session = Depends(get_db), user_id: int = Path(..., description='User id')):
    _user = service.update_user(db, user_id, user.params)
    if not _user:
        raise HTTPException(status_code=404, detail='User not found')
    return ResponseUserSchema(code='200', status='success', message='User updated', result=_user)


@router.delete('/delete/{user_id}', name="Delete", response_model=ResponseUserSchema, tags=["Users"], description="Delete a user")
async def delete_user(user_id: int = Path(..., description='User id'), db: Session = Depends(get_db)):
    _user = service.delete_user_by_id(db, user_id)
    print(_user)
    return ResponseUserSchema(code='200', status='success', message='User deleted', result=_user)
