from model.category import Category
from flask import jsonify
from flask import request
from app import app
from services.db_services import execute,closeConnection,commitConnection
from services.jwt import tocken_required
import pymysql
from services.logger import *
from config import mydb
from validations import validateCategory

        
# insert categories of audios to category table
@app.route('/category', methods=['POST'])
@tocken_required
def addCategory(id=None):
    try:
        json = request.json
        category = json['category']
        categoryobj = Category(id, category)
        validateCategory(category)
        if category and request.method == 'POST' :
            sqlQuery = "INSERT INTO category(category) VALUES( %s)"
            bindData = categoryobj.category
            execute(sqlQuery,bindData)
            commitConnection()
            response = jsonify('Category is added successfully')
            response.status_code = 200
            return response
        else:
            return "something went wrong"
    except ValueError as e:
        logger.error(f"ValueError: {e}")
        return jsonify({'error': str(e)})
    except pymysql.IntegrityError as e:
        logger.error(f"IntegrityError: {e}")
        return jsonify('You are entering wrong category id , which is not in table..!!!')
    except Exception as e :
        return jsonify('something went wrong..!!')
@app.route('/category/<id>', methods=['DELETE'])
@tocken_required
def deleteCategory(id, category=None):
    try:
        categoryobj = Category(id, category)
        sqlQuery = "SELECT category FROM category WHERE id =%s"
        bindData = categoryobj.id
        data = execute(sqlQuery, bindData)
        print(data)
        if data == 0:
            commitConnection()
            response = jsonify('Category does not exist')
            return response
        elif data >0:
            sqlQuery = "DELETE FROM category WHERE id =%s"
            bindData = categoryobj.id
            execute(sqlQuery,bindData)
            commitConnection()
            respone = jsonify('this category deleted successfully!')
            respone.status_code = 200
            return respone
    except Exception as e:
        print(e)
        return jsonify('something went wrong')



#category list view
@app.route('/category', methods=['GET'])
@tocken_required
def viewCategory():
    try:   
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT id, category FROM category")
        empRows = cursor.fetchall()
        conn.commit()
        respone = jsonify(empRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return jsonify("error")