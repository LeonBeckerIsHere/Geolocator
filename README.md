# Section 1


## Requirements
* Docker and its dependencies
* npm

## Running the web app
* Open up a terminal
* Go to the map_app/web-app directory and run npm install (docker should handle this, but theres some issue with the react-scripts not properly being set
* Go back to the root of the repo 
* call 'docker-compose up'
* The web app binds to localhost:3000
* There is a rudimentary flask api that just servers the database. This is listening on locahost:8080.
* If you want to test just the load DB and save DB calls you can use postman and send

    a POST request to http://localhost:8080/api/v1/Map/Db with some json in the body, success indicated by 204
    
    then if you call a GET reqest to http://localhost:8080/api/v1/Map/Db that same json will be returned, success indicated by 200

The web app will automaitcally link up the flask rest api. 
