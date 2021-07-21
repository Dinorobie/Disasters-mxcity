# Import flask
# from flask import Flask, jsonify
from flask import Flask,render_template, redirect,jsonify
from flask_pymongo import PyMongo
import pymongo
app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/disastersmx")


@app.route("/")
def index():
    cleandata = mongo.db.cleandata.find()
    return render_template("index.html", data=cleandata)
    

@app.route("/jsonified")
def jsonified():
    cleandata = list(mongo.db.cleandata.find())
    # db.collection.find({}, {'_id': False})
    for element in cleandata:
        element["_id"]=str(element["_id"])
    return jsonify(cleandata)



if __name__ == "__main__":
    app.run(debug=True)
