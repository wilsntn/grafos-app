from sqlalchemy import Boolean, Column, Integer, String
from src.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    is_active = Column(Boolean, default=True)

    def __repr__(self):
        return f'{self.email}'
