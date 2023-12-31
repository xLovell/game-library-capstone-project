from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    image = db.Column(db.String)
    display_name = db.Column(db.String)
    bio = db.Column(db.String)

    user_games = db.relationship("UserGame", cascade="all, delete", backref="user")
    reviews = db.relationship("Review", cascade="all, delete", backref="user")

    serialize_rules = ('-reviews.user', '-user_games.user')

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('username', 'display_name')
    def validate_scientist(self, key, entry):
        if key == 'username' :
            if entry == None or entry == '':
                raise ValueError("Must have a username")
        if key == 'display_name':
            if entry == None or entry == '':
                raise ValueError("Must have a display name")
        return entry


class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)

    user_games = db.relationship("UserGame", cascade="all, delete", backref="game")
    reviews = db.relationship("Review", cascade="all, delete", backref="game")

    serialize_rules = ('-reviews.game', '-user_games.game')

    @validates('name')
    def validate_name(self, key, name):
        if name == None or name == '':
            raise ValueError("Game must have a name")
        return name


class UserGame(db.Model, SerializerMixin):
    __tablename__ = 'user_games'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    serialize_rules = ('-user.user_games', '-user.reviews', '-game.user_games', '-game.reviews')

    @validates('user_id', 'game_id')
    def validate_scientist(self, key, entry):
        if key == 'user_id' :
            if entry == None or entry == '':
                raise ValueError("Must have a user")
        if key == 'game_id':    
            if entry == None or entry == '':
                raise ValueError("Must have a game")
        return entry

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    rating = db.Column(db.Integer)
    body = db.Column(db.String)

    serialize_rules = ('-game.reviews', '-user.reviews')

    @validates('rating')
    def validate_rating(self, key, rating):
        if isinstance(rating, int) and 1 <= rating <= 5:
            return rating
        else:
            raise ValueError("Rating must be integer between 1 and 5")
