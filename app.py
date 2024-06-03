from flask import Flask, request, jsonify

app = Flask(__name__)

clipboard = {}

@app.route('/clipboard/<name>', methods=['GET', 'POST'])
def handle_clipboard(name):
    if request.method == 'POST':
        content = request.json.get('content')
        clipboard[name] = content
        return jsonify({"message": "Content saved"}), 201
    elif request.method == 'GET':
        content = clipboard.get(name, '')
        return jsonify({"content": content})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
