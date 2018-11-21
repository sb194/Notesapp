from flask import Flask,render_template,request
import flask
from flask_pymongo import PyMongo
import base

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/NotesDb"
mongo = PyMongo(app)
@app.route("/")
def main():
	return base.renderPage(mongo)
@app.route('/deletedoc', methods=['GET','POST'])
def deletedoc():
	noteName = request.form.get('noteName')
	return base.deletedocument(mongo,noteName)	
@app.route('/adddoc', methods=['GET','POST'])
def adddoc():
	noteName = request.form.get('noteName')
	noteContent = request.form.get('noteContent')
	return base.adddocument(mongo,noteName,noteContent)	
         
# @app.route('/getNotes')
# def getNotes():
	# return base.getNotes(mongo)
            # title = "my generated page", \
            # //people = [{"name": "mark"}, {"name": "michael"}]

# renderPage()
# if __name__ == '__main__':
    # main()

# # if __name__ == "__main__":
 # app.renderPage()
# def hello():
    # return "Hello World!"