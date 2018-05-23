# Surfing in Costa Rica

For this application, you will have to create two python files: one which will scrape surfing data from `https://www.surfline.com` and another which will act as a Flask server to post the data collected to.

### Part 1: Scraping the Surf

* Navigate to `https://www.surfline.com/surf-reports-forecasts-cams/costa-rica/3624060` and collect the following information from the page.

  * The surfing location names

  * The heights of the waves in that location

  * The URL for additional information on that location

* Navigate into the URLs collected and then scrape these pages for the following information as well.

  * The water temperature in the location

  * The air temperature in the location

* Create a unique dictionary for each location and, using a connection to MongoDB, insert these documents into a collection called `surf_summary`

### Part 2: Posting the Info

* Create a Flask application that takes the information scraped earlier and posts summaries of each location to the web. You will need to use templates to do this.

