
from datetime import datetime, timedelta
import bcrypt
from model.user import User
import jwt
import pymysql
from config import mydb
from flask import jsonify
from flask import request
from app import app
from validations import validateRegisterData,validateLoginData
from services.db_services import execute,closeConnection,commitConnection
from services.logger import *
# registration of user, here datas are entered to user table
@app.route('/register', methods=['POST'])
def register(id=None):
    try:
        json = request.json
        fullname = json['fullname']
        username = json['username']
        password = json['password']
        usertype = "2"
        validateRegisterData(fullname, username, password)
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        print(hashed_password)
        user = User (id, fullname, username, hashed_password, usertype)
        if fullname and username and password and usertype and request.method == 'POST' :
            query = "SELECT fullname FROM user WHERE username= %s"
            bindData = user.username
            data = execute(query, bindData)
            #data will return value greater than 0 when the query excecutes successfully and return 0 when no such record is found
            if(data > 0):
                commitConnection()
                return jsonify('User already exist !! Try with another username'), 404
            elif (data == 0):
                sqlQuery = "INSERT INTO user(fullname, username, password, usertype) VALUES( %s, %s, %s, %s)"
                bindData = (user.fullname, user.username, user.password, user.usertype)
                execute(sqlQuery, bindData)
                # conn.commit()
                commitConnection()
                respone = jsonify('User added successfully!')
                respone.status_code = 200
                return respone
        else:
            raise ValueError("something went wrong")
    except ValueError as e:
        logger.error(f"ValueError: {e}")
        return jsonify({'error': str(e)})
    except Exception as e :
        print(e)
        logger.error(f"Error: {e}")
        return jsonify('something went wrong')


# login for user and admin
@app.route('/login', methods = ['POST'])
def login(id=None, fullname=None, usertype=None):
    try:
        json = request.json
        username = json['username']
        password = json['password']
        validateLoginData( username, password)
        user = User (id, fullname, username, password, usertype)
        if username and password and request.method == 'POST' :
            conn = mydb.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            query = "SELECT * FROM user WHERE username= %s"
            bindData = user.username
            data = cursor.execute(query, bindData)
            print(data)
            if(data == 0):
                # raise ValueError("User Does not exist.!! Register First..")
                return jsonify(error='User Does not exist.!! Register First..'),404       
            else :
                row = cursor.fetchone()
                hashed_password = row.get('password')
                usertype = row.get('usertype')
                if ( bcrypt.checkpw(user.password.encode('utf-8'),hashed_password.encode('utf-8'))):
                    access_token = jwt.encode(
                    {'username': username,
                     'usertype': usertype,
                    'expiration': str(datetime.utcnow() + timedelta(minutes=30))},
                    app.config['JWT_SECRET_KEY'])
                    conn.commit()
                    return jsonify(message='Login Successful', access_token=access_token ,usertype=usertype),200
                else:
                    conn.commit()
                    return jsonify(error=' Password is incorrect, Try with the correct one..!!'),404              
        else :
            raise ValueError("Some Columns are missing or Mispelled the Column name")
    except ValueError as e:
        logger.error(f"ValueError: {e}")
        return jsonify({'error': str(e)})
    except Exception  :
        logger.error(f"Exception: wrong Username or password")
        raise Exception("wrong Username or password")


