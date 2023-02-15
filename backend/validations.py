from flask import jsonify
import re
# VALIDATE PASSWORD
def validate_password_strength(password):
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long") 
    if not re.search("[a-z]", password):
        raise ValueError( "Password must contain at least one lowercase letter")
    if not re.search("[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter")
    if not re.search("[0-9]", password):
        raise ValueError("Password must contain at least one digit")
    if not re.search("[!@#$%^&*()_+=-]", password):
        raise ValueError("Password must contain at least one special character (!@#$%^&*()_+=-)")
    return True, "Password is strong"
# VALIDATE REGISTER FORM
def validateRegisterData(fullname, username, password):
    #FULL NAME VALIDATION
    if not fullname:
        raise ValueError('fullname is required')
    if len(fullname) < 3:
        return jsonify({"error": "Full name must be at least 3 characters"}), 400
    if not all(i.isalpha() or i.isspace() for i in fullname):
        return jsonify({"error": "Full name can only contain letters and spaces"}), 400

    # USERNAME VALIDATION
    if not username:
        raise ValueError('username is required')
    if len(username) < 3:
        return jsonify({"error": "Username must be at least 3 characters"}), 400
    # PASSWORD VALIDATION
    if not password:
        raise ValueError('password is required')
    password_is_strong, password_error = validate_password_strength(password)
    if not password_is_strong:
        return jsonify({"error": password_error}), 400
    return None

# VALIDATE LOGIN DATA
def validateLoginData( username, password):
    if not username:
        raise ValueError('username is required')
    if not password:
        raise ValueError('password is required')
# VALIDATE AUDIO DATA
def validateAudioData(title, artist, category , album):
    if not title:
        raise ValueError('title is required')
    if not artist:
        raise ValueError('artist is required')
    if not category:
        raise ValueError('category is required')
    if not album:
        raise ValueError('album is required')
# VALIDATE RATING   
def validateRating(userid, trackid, rating):
    if not userid:
            raise ValueError('userid is required')
    if not trackid:
        raise ValueError('trackid is required')
    if not rating:
        raise ValueError('rating is required')
    rate_value= int(rating)
    if rate_value >5 :
        raise ValueError("rating value must be less than or equal to 5")
    if rate_value<1 :
        raise ValueError("rating value must be greater than or equal to 1")
# VALIDATE CATEGORY
def validateCategory(category):
    if not category:
        raise ValueError('category is required')

