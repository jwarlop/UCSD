# 1. import Flask
from flask import Flask,jsonify

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)


# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return "Welcome to my 'Home' page!"


# 4. Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "My name is John Warlop, welcome to my home page"

@app.route("/contact")
def contact():
    print("Server received request for 'contact' page...")
    return("You can reach me at jwarlop@gmail.com")

hello_dict = {'hello':'world'}

@app.route("/normal")
def normal():
    return(hello_dict)

@app.route("/jsonified")
def jsonified():
    return(jsonify(hello_dict))



if __name__ == "__main__":
    app.run(debug=True)