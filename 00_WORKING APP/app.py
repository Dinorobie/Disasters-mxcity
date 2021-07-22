from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
import pymongo

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection

mongo = PyMongo(app, uri="mongodb://localhost:27017/disastersmx")

# Main Index Route

@app.route("/")
def index():

    return "Welcome to the Mexico City disaster database API!"

@app.route("/agebs")
def agebs():
    
    agebs = list(mongo.db.agebs.find())
    for element in agebs:
        element["_id"]=str(element["_id"])

    response_agebs = jsonify(agebs)
    response_agebs.headers.add('Access-Control-Allow-Origin', '*')

    return response_agebs

@app.route("/alcaldias")
def alcaldias():
    
    alcaldias = list(mongo.db.alcaldias.find())
    for element in alcaldias:
        element["_id"]=str(element["_id"])

    response_alcaldias = jsonify(alcaldias)
    response_alcaldias.headers.add('Access-Control-Allow-Origin', '*')

    return response_alcaldias

if __name__ == "__main__":
    app.run(debug=True)