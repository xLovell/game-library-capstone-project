#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Game, UserGame, Review

# Views go here!
def get_all_dict(cls):
    items = [item.to_dict() for item in cls.query.all()]
    return items

def get_one_dict(cls, id):
    item = cls.query.filter(cls.id == id).first()
    return item.to_dict()

def delete_by_id(cls, id):
    item = cls.query.filter(cls.id == id).first()
    if item != None:
        db.session.delete(item)
        db.session.commit()
        response = make_response({}, 204)
    else:
        response = make_response({"error": f"{cls} not found"}, 404)
    return response


class Index(Resource):
    def get(self):
        response_dict = {
            "index": "Game. Gaming. Gamer."
        }
        return make_response(response_dict, 200)

class Users(Resource):
    def get(self):
        return make_response(get_all_dict(User), 200)

    def post(self):
        json = request.get_json()
        try:
            new_user = User(
                username = json["username"],
                password = json["password"],
                image = json["image"],
                display_name = json["display_name"],
                bio = json["bio"]
            )
            db.session.add(new_user)
            db.session.commit()
            
            return make_response(new_user.to_dict(), 200)
        
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

class UsersByID(Resource):
    def get(self, id):
        return make_response(get_one_dict(User, id), 200)

    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        for attr in request.get_json():
            setattr(user, attr, request.get_json()[attr])

        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(), 200)

    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        db.session.delete(user)
        db.session.commit()

        return make_response({"message": "no content"}, 204)

class Games(Resource):
    def get(self):
        return make_response(get_all_dict(Game), 200)

    def post(self):
        json = request.get_json()
        try:
            game = Game(
                name = json["name"],
                image = json["image"]
            )
            db.session.add(game)
            db.session.commit()

            return make_response(game.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]},400)


class GamesByID(Resource):
    def get(self, id):
        return make_response(get_one_dict(Game, id), 200)

class UserGames(Resource):
    def get(self):
        return make_response(get_all_dict(UserGame), 200)

    def post(self):
        json = request.get_json()
        try:
            user_game = UserGame(
                user_id = json["user_id"],
                game_id = json["game_id"]
            )
            db.session.add(user_game)
            db.session.commit()

            return make_response(user_game.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]},400)

class UserGamesByID(Resource):
    def delete(self, id):
        return delete_by_id(UserGame, id)

class Reviews(Resource):
    def get(self):
        return make_response(get_all_dict(Review), 200)

    def post(self):
        json = request.get_json()
        try:
            review = Review(
                user_id = json["user_id"],
                game_id = json["game_id"],
                rating = json["rating"],
                body = json["body"]
            )
            db.session.add(review)
            db.session.commit()

            return make_response(review.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["validation errors"]},400)

class ReviewsByID(Resource):
    def get(self, id):
        return make_response(get_one_dict(Review, id), 200)

    def delete(self, id):
        return delete_by_id(Review, id)


api.add_resource(Index, "/")
api.add_resource(Users, "/users")
api.add_resource(UsersByID, "/users/<int:id>")
api.add_resource(Games, "/games")
api.add_resource(GamesByID, "/games/<int:id>")
api.add_resource(UserGames, "/usergames")
api.add_resource(UserGamesByID, "/usergames/<int:id>")
api.add_resource(Reviews, "/reviews")
api.add_resource(ReviewsByID, "/reviews/<int:id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

