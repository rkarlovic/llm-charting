from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, text


# db = sa.create_engine("sqlite:///:memory:")
# Session = sessionmaker(bind=db)
# Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    email = Column(String, nullable=False)
    date_added = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    date_modified = Column(TIMESTAMP(timezone=True), nullable=True)

    #what is difference between server_default and default