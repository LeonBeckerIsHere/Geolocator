import json
from flask import Flask, Blueprint, jsonify, request
from flask_restful import Resource, Api



# load api modules
from src.api.resources.map import map_bp

# Initialize Flask app
app = Flask(__name__)

# register api modules
app.register_blueprint(map_bp, url_prefix="/api/v1/Map")


  
  
