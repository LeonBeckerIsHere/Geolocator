from flask_restful import Resource

from . import map_api
from .map_db import MapDb

map_api.add_resource(MapDb, "/Db")