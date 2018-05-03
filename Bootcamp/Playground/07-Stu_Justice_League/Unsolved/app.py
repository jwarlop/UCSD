# 1. import Flask
from flask import Flask,jsonify

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

justice_league_members = [
    {"superhero": "Aquaman", "real_name": "Arthur Curry"},
    {"superhero": "Batman", "real_name": "Bruce Wayne"},
    {"superhero": "Cyborg", "real_name": "Victor Stone"},
    {"superhero": "Flash", "real_name": "Barry Allen"},
    {"superhero": "Green Lantern", "real_name": "Hal Jordan"},
    {"superhero": "Superman", "real_name": "Clark Kent/Kal-El"},
    {"superhero": "Wonder Woman", "real_name": "Princess Diana"}
]

# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    return(
    f"Welcome to the Justice League API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/justice-league<br/>"
        f"/api/v1.0/justice-league/Arthur%20Curry<br/>"
        f"/api/v1.0/justice-league/Bruce%20Wayne<br/>"
        f"/api/v1.0/justice-league/Victor%20Stone<br/>"
        f"/api/v1.0/justice-league/Barry%20Allen<br/>"
        f"/api/v1.0/justice-league/Hal%20Jordan<br/>"
        f"/api/v1.0/justice-league/Clark%20Kent/Kal-El<br/>"
        f"/api/v1.0/justice-league/Princess%20Diana"
    )

@app.route("/api/v1.0/justice-league/<real_name>")
def jleague(real_name):
    for idx,e in enumerate(justice_league_members):
        if e['real_name'] == real_name:
            return(jsonify(e['real_name']))
    
 
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

