# creating a class Audio which have all the audio details
class Audio:
    def __init__(self, trackid: str, title: str, artist: str, category_id: int, album: str):
        self.trackid = trackid
        self.title = title
        self.artist = artist
        self.category_id = category_id
        self.album = album