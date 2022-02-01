import json
from flask import request
from flask_restful import Resource
  
#MapDb for loading and saving from the "database"
class MapDb(Resource):
  
    # corresponds to the GET request.
    def get(self):
        try:
            with open("./Data/Database/store.json","r") as fileHandle:
                data = json.load(fileHandle)
        except OSError as e:
            return "Resource does not exist",404
        
        return data,200
    
    # Corresponds to POST request
    def post(self):
          
        data = request.get_json()
        
        try:
            with open("./Data/Database/store.json","w+") as fileHandle:
                json.dump(data,fileHandle)
        except OSError as e:
            return "There was a problem with writing to the database",404   
         
        return "",201

