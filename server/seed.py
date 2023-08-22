#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import User, Game, UserGame, Review, db

# def create_users():
#     users = []
#     for _ in range(30):
#         user = User(
#             username = fake.text(max_nb_chars=5).replace(".", "").lower(),
#             password = fake.text(max_nb_chars=5).replace(".", "").lower(),
#             display_name = fake.sentence(nb_words=1),
#             bio = fake.sentence(nb_words=10)
#         )
#         users.append(user)
#     return users

# def create_games():
#     games = []
#     for _ in range(10):
#         game = Game(
#             name = fake.sentence(nb_words = 2),
#             image = 'https://www.shutterstock.com/shutterstock/photos/1656207211/display_1500/stock-vector-gamepad-icon-trendy-and-modern-placeholder-symbol-for-logo-web-app-ui-1656207211.jpg'
#         )
#         games.append(game)
#     return games

# def create_random_reviews():
#     reviews = []
#     for _ in range(15):
#         review = Review(
#             user_id=rc(users).id,
#             game_id=rc(games).id,
#             rating=rc([1, 2, 3, 4, 5]),
#             body=fake.sentence(nb_words=7)
#         )
#         reviews.append(review)
#     return reviews

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # User.query.delete()
        game = Game.query.filter(Game.id == 7).first()
        user = User.query.filter(User.id == 3).first()
        db.session.delete(game)
        db.session.delete(user)
        # Game.query.delete()
        # UserGame.query.delete()
        # Review.query.delete()

        # users = create_users()
        # db.session.add_all(users)
        # db.session.commit()

        # games = create_games()
        # db.session.add_all(games)
        db.session.commit()

        # reviews = create_random_reviews()
        # db.session.add_all(reviews)
        # db.session.commit()

