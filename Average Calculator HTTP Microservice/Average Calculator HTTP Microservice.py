#Develop Average Calculator HTTP Microservice
#Implementation of the Average Calculator microservice using Flask:
from flask import Flask, request, jsonify
import requests
from collections import deque

app = Flask(__name__)

class AverageCalculator:
    def __init__(self, window_size):
        self.window_size = window_size
        self.window_prev_state = deque(maxlen=window_size)
        self.window_curr_state = deque(maxlen=window_size)

    def fetch_numbers(self, number_id):
        if number_id == 'p':
            url = 'http://20.244.56.144/test/primes'
        elif number_id == 'f':
            url = 'http://20.244.56.144/test/fibo'
        elif number_id == 'e':
            url = 'http://20.244.56.144/test/even'
        elif number_id == 'r':
            url = 'http://20.244.56.144/test/random'
        else:
            return jsonify({'error': 'Invalid number ID'}), 400

        try:
            response = requests.get(url, timeout=1)
            response.raise_for_status()
        except requests.RequestException as e:
            return jsonify({'error': 'Failed to fetch numbers'}), 500

        numbers = response.json()['numbers']
        return numbers

    def update_window_state(self, numbers):
        self.window_prev_state = self.window_curr_state
        self.window_curr_state = deque(numbers[:self.window_size], maxlen=self.window_size)

    def calculate_average(self):
        return sum(self.window_curr_state) / len(self.window_curr_state)

@app.route('/numbers/<number_id>', methods=['GET'])
def get_numbers(number_id):
    calculator = AverageCalculator(window_size=10)
    numbers = calculator.fetch_numbers(number_id)
    calculator.update_window_state(numbers)
    avg = calculator.calculate_average()
    return jsonify({
        'windowPrevState': list(calculator.window_prev_state),
        'windowCurrState': list(calculator.window_curr_state),
        'numbers': numbers,
        'avg': avg
    })

if __name__ == '__main__':
    app.run(host='localhost', port=9876)
