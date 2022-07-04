from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def is_email(form, field):
    # Checking for valid email format
    email = field.data
    if(not re.fullmatch(regex, email)):
        raise ValidationError('Invalid e-mail address.')

def username_check(form, field):
    # Checking for valid length for username
    username = field.data
    if len(username) < 3 or len(username) > 20:
        raise ValidationError('Invalid username length, use 3 to 20 characters.')

def password_check(form, field):
    # Checking for valid length for password
    password = field.data
    if len(password) < 6 or len(password) > 30:
        raise ValidationError('Invalid password length, use 6 to 30 characters.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_check])
    email = StringField('email', validators=[DataRequired(), user_exists, is_email])
    password = StringField('password', validators=[DataRequired(), password_check])
