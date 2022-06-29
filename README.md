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
The link between flask and the react web app does work, but my main issue is I was never able to get the layers of the GeoJSON rendering given the time I had available to me.

## Reflection
* Overall I spend about 12 hours working on this and I was only able to almost complete section 1 and complete section 2
* Given this was my first time using Docker, flask, and React outside of very basic projects. I personally find the work done here to be a success
* Were I to do this over I would focus more on getting small compartments working first. I spent about 2 hours figuring out how to setup integrate flask and react together with docker, after that I spent another 4 hours writing out all the code, and then 6 hours troubleshooting. I couldve saved more time in the long run to test each component seperately to assured it was working in isolation, especially doing more testing on the GeoJSON feature layer loading as that was the last thing I was working on and I'm still curious as to why it's not functioning.

# Section 2

The word document is in the root of the repo. Didn't understand #4, but the rest of the queries were easy to wrtie.

