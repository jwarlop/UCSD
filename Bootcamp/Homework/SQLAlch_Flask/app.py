
import datetime as dt 
import numpy as np 
import pandas as pd 

import sqlalchemy 
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData, Table


from flask import Flask, jsonify

##################
# Database Setup
###################
#engine = create_engine("sqlite:///resources/hawaii.sqlite")
#conn = engine.connect()
#Base = automap_base() #vs declarative_base()
#Base.prepare(engine,reflect=True)
#metadata = MetaData()
#Station_ = Table('hstations',metadata,autoload=True,
#                autoload_with=engine)
#Measurement_ = Table('hmeasurements',metadata,autoload=True,
#                autoload_with=engine)
####################
# Flask Setup
####################
app = Flask(__name__)

#####################
# Flask Routes
#####################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start>"
        f"/api/v1.0/<start>/<end>"
    )

@app.route("/api/v1.0/precipitation")
def precip():
    # query data and temp from prior year, {date:tobs}...
    engine = create_engine("sqlite:///resources/hawaii.sqlite")
    conn = engine.connect()
    stmt = "SELECT `date`,avg(`prcp`) FROM HMEASUREMENTS WHERE "
    stmt += "date BETWEEN datetime('now','-365 days') "
    stmt += "AND datetime('now','localtime') GROUP BY date;"
    rs = conn.execute(stmt)
    rq = rs.fetchall()
    d = {}
    for i in rq:
        d[i[0]]=i[1]
    return(jsonify(d))


@app.route("/api/v1.0/stations")
def stations():
    #list of stations from dataset. [station1,station2,...]
    engine = create_engine("sqlite:///resources/hawaii.sqlite")
    conn = engine.connect()
    stmt = "SELECT `station` FROM HSTATIONS"
    rs = conn.execute(stmt)
    rq = rs.fetchall()
    return(jsonify(rq))
    #list of stations from dataset. [station1,station2,...]

@app.route("/api/v1.0/tobs")
def tobs():
    #list of temp observations from previous year. [tobs1,tobs2,....]
    return("tobs")

@app.route("/api/v1.0/<start>")
def temp_data(_start):
    #tmin,tavg,tmax from start to end of data
    return("s")

@app.route("/api/v1.0/<start>/<end>")
def temp_data_se(_start,_end):
    #tmin,tavg,tmax from start to end inclusive
    return("s,e")

engine = create_engine("sqlite:///resources/hawaii.sqlite",echo=True)
conn = engine.connect()
stmt = "SELECT * FROM HSTATIONS;"
rs = conn.execute(stmt)
rq = rs.fetchall()

if __name__ == '__main__':
    app.run(debug=True)
