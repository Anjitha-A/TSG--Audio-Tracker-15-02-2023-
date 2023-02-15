from app import app
from services.audio import *
from services.role import *
from services.category import *
from services.auth import *
from services.rating import *
from services.search import *
from services.logger import *

if __name__ == "__main__":  
    app.run(debug = True)