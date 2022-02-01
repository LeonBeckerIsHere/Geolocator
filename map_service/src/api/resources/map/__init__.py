from flask import Blueprint
from flask_restful import Api

map_bp = Blueprint('map', __name__)
map_api = Api(map_bp)

from . import routes