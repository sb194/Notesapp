from flask import Flask,render_template,jsonify
from flask_pymongo import PyMongo
def renderPage(mongo):
	Notes =[];
	cur = mongo.db.NotesDb.find({}, {'_id': False})
	for doc in cur:
		Notes.append(doc)
	
	return render_template('HomePage.html',Notes = Notes)

def deletedocument(mongo,title):
	mongo.db.NotesDb.delete_one({"name":title})
	data =[];
	cur = mongo.db.NotesDb.find({}, {'_id': False})
	for doc in cur:
		data.append(doc)
	return jsonify(data)
def adddocument(mongo,noteName,noteContent):
	mongo.db.NotesDb.insert_one({ "name": noteName, "content": noteContent })
	data =[];
	cur = mongo.db.NotesDb.find({}, {'_id': False})
	for doc in cur:
		data.append(doc)
	return jsonify(data)
	
	