from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, SubmitField
from wtforms.validators import DataRequired


class NewTrip(FlaskForm):
    user_id = IntegerField("User", validators=[DataRequired()])
    start = StringField("Pick Up", validators=[DataRequired()])
    start_lat = DecimalField()
    start_lng = DecimalField()
    end = StringField("Drop Off", validators=[DataRequired()])
    end_lat = DecimalField()
    end_lng = DecimalField()
    price = DecimalField("Price")
    submit = SubmitField("Submit")
