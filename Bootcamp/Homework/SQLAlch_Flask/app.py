
import datetime as dt 
import numpy as np 
import pandas as pd 

import sqlalchemy 
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

##################
# Database Setup
###################


####################
# Flask Setup
####################
app = Flask(__name__)

#####################
# Flask Routes
#####################

@app.route("/api/v1.0/precipitation")
def precip():
    # query data and temp from prior year, {date:tobs}...


@app.route("/api/v1.0/stations")
def stations():
    #list of stations from dataset. [station1,station2,...]

@app.route("/api/v1.0/tobs")
def tobs():
#list of temp observations from previous year. [tobs1,tobs2,....]

@app.route("/api/v1.0/<start>")
def temp_data(_start):
    #tmin,tavg,tmax from start to end of data

@app.route("/api/v1.0/<start>/<end>")
def temp_data_se(_start,_end):
    #tmin,tavg,tmax from start to end inclusive