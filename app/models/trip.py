from .db import db
from datetime import date
import simplejson as json

class Trip(db.Model):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    start = db.Column(db.String(255))
    start_lat = db.Column(db.Numeric(15, 10))
    start_lng = db.Column(db.Numeric(15, 10))
    end = db.Column(db.String(255))
    end_lat = db.Column(db.Numeric(15, 10))
    end_lng = db.Column(db.Numeric(15, 10))
    price = db.Column(db.Numeric(5, 2))
    created_at = db.Column(db.Date, nullable=False, default=date.today)
    updated_at = db.Column(db.Date, nullable=False, default=date.today)

    user = db.relationship("User", back_populates="trips")


    @property
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "start": self.start,
            "start_lat": json.dumps(self.start_lat, use_decimal=True),
            "start_lng": json.dumps(self.start_lng, use_decimal=True),
            "end": self.end,
            "end_lat": json.dumps(self.end_lat, use_decimal=True),
            "end_lng": json.dumps(self.end_lng, use_decimal=True),
            "price": json.dumps(self.price, use_decimal=True),
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
