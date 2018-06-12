#import necessary libraries
import os
import pandas as pd
import numpy as numpy
import sqlalchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from  sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, render_template
import csv

# create instance of Flask app
app = Flask(__name__)

dbfile = os.path.join('db','belly_button_biodiversity.sqlite')
engine=create_engine(f"sqlite://{dbfile}")

# reflect an existing database into a new model
Base=automap_base()
# reflect the tables
Base.prepare(engine,reflect=True)

# 
print(Base.classes.kesy())

Samples_Metadata = Base.classes.samples_metadata
OTU = Base.classes.otu
Samples = Base.classes.samples

# Create our session (link) from Python to the DB
session = Session(engine) #I can now query w/session

#results = session.query(OTU.)

# create route that renders index.html template
@app.route("/")
def echo():
    with open('data/belly_button_biodiversity_samples.csv') as f:
    line1 = f.readline()

# This route uses Pandas
@app.route("/names")
def names():
    """Return a list of samplel names."""
    # Use Pandas to perform the sql query
    stmt = session.query(Samples).statement
    df = pd.read_sql_query(stmt,session.bind)
    df.set_index('otu_id',inplace=True)
    # Return a list of the column names(sample names)
    return jsonify(list(df.columns))

@app.route('/otu')
def otu():
    """Return a list of OTU descriptions."""
    results = session.query
    (OTU.lowest_taxonomic_unit_found).all()
    otu_list = list(np.ravel(results))
    return jsonify(otu_list)

@app.route('/metadata/<sample>')#passing info to Flask server
def sample_metadata(sample):
    """Return the MetaData for a given sample."""
    sel = [Samples_Metadata.SAMPLEID,
        Samples_Metadata.ETHNICITY,
        Samples_Metadata.GENDER,
        Samples_Metadata.AGE,
        Samples_Metadata.LOCATION,
        Samples_Metadata.BBTYPE]

    # sample[3:] strips teh 'BB_' prefix form the sample name to match
    # the numeric value of 'SAMPLEID' from the database
    results = session.query(*sel).\
        filter(Samples_Metadata.SAMPLEID == sample[3:]).all()

    print(results[0]) #to output
    # Create a dictionary entry for each row of metadata information

    sample_metadata = {}
    for result in results:
        sample_metadata['SAMPLEID'] = results[0]
        #sample_metadata['ETHNICITY'] = ... 
        # ['BBTYPE']=result[5]

    #@app.route('/wfreq/<sample>'):

    @app.route('/samples/<sample>')
    def samples
        stmt = session.query(Samples).statement
        df = pd.read_sql_query(stmt,session.bind)

        if sample not in df.columsn:
            return jsonify(f"Error! Sample: {sample} Not Found!"),400

        df = df[df[sample] > 1 ]

        df = df.sort_values(by=sample,ascending=0)

        data = [{
            "out_ids":df[sample]
        }]

    return jsonify(sample_metadata)




if __name__ == "__main__":
    app.run(debug=True)