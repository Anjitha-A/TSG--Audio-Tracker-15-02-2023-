import bcrypt
from flask import Flask
import bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
CORS(app)

