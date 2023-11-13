import service

class Game:
    def __init__(self, game_id, game_name):
        self.id= game_id
        self.name = game_name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

    def __str__(self):
        return f"Game: id={self.id}, name={self.name}"

def data_crossword():
    data = 'oooooo'
    game_data = service.game(data)
    
    if game_data:
        game_id = game_data.get('id')
        game_name = game_data.get('name')
        game_obj = Game(game_id, game_name)
        return game_obj
    else:
        return None
