from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.users.models import User
from src.users.schema import UserResponseSchema, UserSchema
from src.users.dependencies import hash_password


def create_user(db: Session, user: UserSchema):
    _hashed_password = hash_password(user.password)
    _db_user = User(username=user.username,
                    email=user.email, password=_hashed_password)
    db.add(_db_user)
    db.commit()
    db.refresh(_db_user)
    return _db_user


def delete_user_by_id(db: Session, user_id: int):
    _user = get_user_by_id(db, user_id)
    db.delete(_user)
    db.commit()
    return _user


def update_user(db: Session, user_id: int, user: UserSchema):
    _user = get_user_by_id(db, user_id)
    _user.email = user.username  # type: ignore
    _user.email = user.email  # type: ignore
    _user.password = user.password  # type: ignore
    db.commit()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def get_user_by_id(db: Session, user_id: int) -> UserResponseSchema:
    _user = db.query(User).filter(User.id == user_id).first()
    if not _user:
        raise HTTPException(status_code=404, detail='User not found')
    return UserResponseSchema.from_orm(_user)
