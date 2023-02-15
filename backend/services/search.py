
import jwt
import pymysql
from config import mydb
from flask import jsonify
from flask import request
from app import app
from services.jwt import tocken_required

#searching audios by title, category or album
@app.route('/search', methods=['POST'])
@tocken_required
def search():
    try:
        json = request.json
        search_value = json['search_value']
        print(search_value)
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        data = cursor.execute("SELECT * FROM audio WHERE title LIKE %s OR  album LIKE %s", ('%' + search_value + '%',  '%' + search_value + '%'))
        print(data)
        if( data == 0):
             return jsonify(error='No matches found.. !!'),404
        row = cursor.fetchall()
        conn.commit()
        print("emprow", row) 
        response = jsonify(row)
        response.status_code = 200
        return response
    except Exception as e:
        print(e)









