from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, SubmitField
from wtforms.validators import DataRequired


class NewTrip(FlaskForm):
    user_id = IntegerField("User", validators=[DataRequired()])
    start = StringField("Pick Up", validators=[DataRequired()])
    lat = DecimalField()
    lng = DecimalField()
    end = StringField("Drop Off", validators=[DataRequired()])
    lat = DecimalField()
    lng = DecimalField()
    price = DecimalField("Price")
    submit = SubmitField("Submit")
