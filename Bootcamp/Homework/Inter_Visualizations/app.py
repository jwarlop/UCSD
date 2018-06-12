#import necessary libraries
from flask import Flask, render_template
import csv

# create instance of Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def echo():
    with open('data/belly_button_biodiversity_samples.csv','rb') as f:
        reader = csv.reader(f)
    return render_template("index.html",text="<h1>H1</h1>")

if __name__ == "__main__":
    app.run(debug=True)