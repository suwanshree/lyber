# from .db import db
# from datetime import date

# class Listing(db.Model):
#     __tablename__ = 'listings'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     title = db.Column(db.String(255), nullable=False)
#     location = db.Column(db.String(255), nullable=False)
#     category = db.Column(db.Integer, nullable=False)
#     description = db.Column(db.String(5000), nullable=False)
#     image_url = db.Column(db.String, nullable=False)
#     rating = db.Column(db.Integer, nullable=True)
#     created_at = db.Column(db.Date, nullable=False, default=date.today)
#     updated_at = db.Column(db.Date, nullable=False, default=date.today)

#     user = db.relationship("User", back_populates="listings")
#     reviews = db.relationship("Review", back_populates="listing", cascade="all, delete-orphan")


#     @property
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "userId": self.user_id,
#             "title": self.title,
#             "location": self.location,
#             "category": self.category,
#             "description": self.description,
#             "imageUrl": self.image_url,
#             "rating": self.rating,
#             "createdAt": self.created_at,
#             "updatedAt": self.updated_at,
#         }
