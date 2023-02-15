import jwt
from app import app
from functools import wraps
from flask import jsonify,request
def tocken_required(func):   
        @wraps(func)
        def decorated(*args, **kwargs):
            access_token =request.headers.get('Authorization')
            print(access_token)
            access_token = access_token.replace('Bearer ', '')
            if not access_token:
                return jsonify({"alert":"Token is missing..!!"})
            try:
                data = jwt.decode(access_token, app.config['JWT_SECRET_KEY'], algorithms='HS256')
                print("data", data.get('usertype'))             
            except:
                return jsonify({"alert":"Invalid Token"})  
            return func(*args, **kwargs)
        return decorated
    








    
# def checkUser(data):
#     usertype  = data.get('usertype')
#     if(usertype ==1):
#         print("admin")
#         return 'true'
#     else :
#         print("user")
