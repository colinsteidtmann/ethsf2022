from flask_api import FlaskAPI
from web3 import Web3
from flask import request

app = FlaskAPI(__name__)

dummy_data = {"address": ["0x123456", "0x654321", "0x55555"]}

@app.route('/', methods=["GET"])
def index():
    return {"Vick": "Vick"}


@app.route('/getWinner', methods=["GET"])
def get_winner():
    # takes in an array of addresses.
    
    

    
    return {"Winners": data["winner"]}

if __name__=="__main__":
    app.run(debug=True)