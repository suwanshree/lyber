from flask import Blueprint, request, render_template, redirect
from ..forms import NewTrip
from ..models import db, Trip, User
from datetime import date


trip_routes = Blueprint('trips', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@trip_routes.route('/', methods=['POST'])
def trips():
    form = NewTrip()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("FORM DATA-------------------------->", form.data)
    if form.validate_on_submit():
        new_trip = Trip(
            user_id=form.data["user_id"],
            start=form.data["start"],
            start_lat=form.data["start_lat"],
            start_lng=form.data["start_lng"],
            end=form.data["end"],
            end_lat=form.data["end_lat"],
            end_lng=form.data["end_lng"],
            price=form.data["price"],

        )
        db.session.add(new_trip)
        db.session.commit()
        return new_trip.to_dict
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@trip_routes.route("/users/<int:id>")
def users_owned_trips(id):
    trips = Trip.query.filter(Trip.owner_id == id).all()
    user = User.query.get(id)

    made_trips = {}
    for trip in trips:
        made_trips[trip.id] = trip.to_dict
    return made_trips


@trip_routes.route("/<int:id>")
def change_trip(id):
    trip = Trip.query.get(id)
    if trip:
        return trip.to_dict
    else:
        return {'error': ['No Trip Found']}
