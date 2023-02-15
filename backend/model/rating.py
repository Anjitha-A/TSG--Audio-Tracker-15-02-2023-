# create class for ratings
class Rating :
    def __init__(self, rateid:str, userid:str, trackid:str, rating:str):
        self.rateid = rateid
        self.userid = userid
        self.trackid = trackid
        self.rating = rating