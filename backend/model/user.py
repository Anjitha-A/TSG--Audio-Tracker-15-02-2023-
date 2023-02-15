#create user class
class User:
    def __init__(self, id:str, fullname:str, username:str, password:str, usertype: str):
        self.id = id
        self.fullname = fullname
        self.username = username
        self.password = password
        self.usertype = usertype