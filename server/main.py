from flask import Flask, request, jsonify
from flask_cors import CORS
import data

class Game:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

app = Flask(__name__)
CORS(app)

crossword_data = data.data_crossword() 

@app.route('/crossword', methods=['GET'])
def get_crossword_item():
    try:
        serialized_data = crossword_data.to_dict()

        response_data = serialized_data
        return jsonify(response_data)

    except Exception as e:
        response_data = {
            'ok': False,
            'error': str(e)
        }
        return jsonify(response_data), 500

if __name__ == '__main__':
    app.run(debug=True)
