from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demouser@aa.io', password='123456')
    suwan = User(
        username='Suwanshree', email='suwanshree@aa.io', password='123456')
    john = User(
        username='John', email='suwan@aa.io', password='123456')
    mary = User(
        username='Mary', email='mary@aa.io', password='123456')

    db.session.add(demo)
    db.session.add(suwan)
    db.session.add(john)
    db.session.add(mary)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
