from model.audio import Audio
import pymysql
from config import mydb
from flask import jsonify, make_response
from flask import request
from app import app
from services.db_services import execute,closeConnection,commitConnection
from validations import validateAudioData
from services.jwt import tocken_required
from services.logger import *


# insert audio details into audio table
@app.route('/audio', methods=['POST'])
@tocken_required
def createAudio(trackid=None):
    try:
        json = request.json
        title = json['title']
        artist = json['artist']
        category_id = json['category_id']
        album = json['album']
        print("json", json)
        validateAudioData(title, artist, category_id, album)
        audio = Audio(trackid, title, artist, category_id, album)
        if title and artist and category_id and album  and request.method == 'POST':
            print(audio.title)
            sqlQuery = "INSERT INTO audio(title, artist, category_id, album) VALUES( %s, %s, %s,%s)"
            bindData = (audio.title, audio.artist, audio.category_id, audio.album)
            execute(sqlQuery, bindData)
            commitConnection()
            response = jsonify('Audio added successfully!')
            response.status_code = 200
            return response
        else:   
            return showMessage()
    except ValueError as e:
        logger.error(f"ValueError: {e}")
        return jsonify({'error': str(e)})
    except pymysql.IntegrityError as e:
        logger.error(f"IntegrityError: {e}")
        return jsonify('You are entering wrong category id , which is not in table..!!!')
    except Exception as e :
        print(e)
        return jsonify('something went wrong..!!')


# delete audio from table audio
@app.route('/audio/<trackid>', methods=['DELETE'])
@tocken_required
def deleteAudio(trackid, title=None, artist=None,  category_id=None, album=None):
    try:     
        audio = Audio(trackid, title, artist, category_id, album) 
        # check whether the audio exist in database or not   
        sqlQuery = "SELECT title FROM audio WHERE trackid =%s"
        bindData = audio.trackid
        data = execute(sqlQuery, bindData)
        print(data)
        if data == 0:
            commitConnection()
            response = jsonify('Audio does not exist')   # if not exists, it shows this message
            return response
        elif data >0:                                 #if exists, first need to check whether it has the rating
                query = "SELECT rating FROM rating WHERE trackid = %s"
                bindData = audio.trackid
                data = execute(query, bindData)
                print(data)
                if(data >0):                 #if the audio have some rating, then need to delete its rating first
                    query = "DELETE rating FROM rating WHERE trackid = %s"
                    bindData = audio.trackid
                    execute(query, bindData)
                sqlQuery = "DELETE FROM audio WHERE trackid =%s"              # then delete the audio
                bindData = audio.trackid
                data = execute(sqlQuery, bindData)
                print(data)
                commitConnection()
                respone = jsonify('this audio deleted successfully!')
                respone.status_code = 200
                return respone
    except Exception as e:
            print(e)
            return jsonify("error")


# update audio from audio table
@app.route('/audio/<trackid>', methods=['PUT'])
@tocken_required
def updateAudio(trackid):
    try:
        _json = request.json
        print(_json)
        new_track_id = trackid
        new_title = _json['title']
        new_artist = _json['artist']
        new_category_id = _json['category_id']
        new_album = _json['album']
        audio = Audio(new_track_id, new_title, new_artist, new_category_id, new_album)
        validateAudioData(new_title, new_artist, new_category_id, new_album)
        print(audio.trackid)
        if new_title and new_artist and new_category_id and new_album and request.method == 'PUT':           
            query = "SELECT title FROM audio WHERE trackid=%s"  #check whether the track is exist in db or not
            bindData = audio.trackid
            data = execute(query, bindData)
            if data == 0:           
                commitConnection()
                response = jsonify('Audio does not exist')   #if not , it should return error 
                response.status_code = 404
                return response
            elif data >0:                        #if exist, the new details are updated
                sqlQuery = " UPDATE audio SET title= %s, artist= %s, category_id= %s, album= %s  WHERE trackid=%s "
                bindData = (audio.title, audio.artist, audio.category_id, audio.album,  audio.trackid)
                execute(sqlQuery, bindData)
                commitConnection()
                response = jsonify('Audio updated successfully!')
                response.status_code = 200
                print(response)
                return response
        else:
            return jsonify('something went wrong')
    except ValueError as e:
        logger.error(f"ValueError: {e}")
        return jsonify({'error': str(e)})
    except pymysql.IntegrityError as e:
        logger.error(f"IntegrityError: {e}")
        return jsonify('You are entering wrong category id , which is not in table..!!!')
    except Exception as e:
        return jsonify('some error')


# view all audios from audio table ------------ taking values from 2 tables to view the audio details and category details
@app.route('/audio', methods=['GET'])
@tocken_required
def viewAudios():
    try:   
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT audio.trackid,audio.title,audio.artist,category.category, audio.album FROM audio JOIN category ON audio.category_id = category.id")
        empRows = cursor.fetchall()
        conn.commit()
        respone = jsonify(empRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return jsonify("error")

        
# view particular audio from audio table----------- while viewing the particular audio, its rating also displayed, for that audio, category
@app.route('/audio/<trackid>', methods=['GET'])                      # and rating tables are joined
@tocken_required
def audioDetails(trackid, title=None, artist=None, category_id=None, album=None):
    try:
        audio = Audio(trackid, title, artist, category_id, album)
        print(audio.trackid)
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        sqlQuery = "SELECT rating FROM audio_tracker.rating where trackid =%s "
        bindData = audio.trackid
        data = cursor.execute(sqlQuery, bindData)
        print(data)
        if( data >0):     
             sqlQuery = "SELECT * FROM (SELECT audio.trackid,audio.title,audio.album, audio.artist,category.category,  round(avg(rating.rating),2)as rating from rating inner join audio on audio.trackid = rating.trackid inner join category on audio.category_id = category.id group by audio.title,audio.category_id , audio.album,audio.trackid) sub where trackid =%s";
             bindData = audio.trackid
             cursor.execute(sqlQuery, bindData)
             empRow = cursor.fetchone()
             respone = jsonify(empRow)
             respone.status_code = 200
             return respone         
        elif(data == 0):
            sqlQuery = "SELECT audio.trackid, audio.title, audio.artist, category.category, audio.album FROM audio_tracker.audio JOIN audio_tracker.category ON audio.category_id = category.id where trackid = %s"
            bindData = audio.trackid
            cursor.execute(sqlQuery, bindData)
            empRow = cursor.fetchone()
            respone = jsonify(empRow)
            respone.status_code = 200
            return respone    
    except Exception as e:
        print(e)
        return jsonify("error")

# error handling
@app.errorhandler(404)
def showMessage(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone
  



#for testing we are writting the code as seperate file
# def addAudio(trackid, title, artist, categoryid, album):
#         if not title or not artist or not categoryid or not album :
#             response = make_response(jsonify({'message': 'All fields are required'}))
#             response.status_code = 400
#             return response
#         audio = Audio(trackid, title, artist, categoryid, album)
#         print("print",audio.title)
#         if request.method == 'POST':
#             sqlQuery = "INSERT INTO audio(title, artist, categoryid, album) VALUES( %s, %s, %s,%s)"
#             bindData = (audio.title, audio.artist, audio.categoryid, audio.album)
#             try:
#                 execute(sqlQuery, bindData)
#                 commitConnection()
#                 response = jsonify({'message': 'audio added successfully!'})
#                 response.status_code = 200
#                 return response
#             except pymysql.err.IntegrityError as e:
#                 logger.error(f"IntegrityError: {e}")
#                 return jsonify({'message': 'Audio already exists with the same name'})
            
        
            




