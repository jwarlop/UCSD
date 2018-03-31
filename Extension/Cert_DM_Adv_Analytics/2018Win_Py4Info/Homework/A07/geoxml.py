# Assignment 7
# Web Services & Databases
# John M Warlop
# Python 3.x
# Due 3/11/2018
import re
from urllib.parse import urlencode
from urllib.request import urlopen
import xml.etree.ElementTree as ET 
surl = 'https://maps.googleapis.com/maps/api/geocode/xml?'
p='short_name>(\S\S)<\S*\n.*(country)'
s=re.compile(p)
while True:
    address = input('Enter location: ')
    if len(address) < 1 : break
    p = {'sensor':'false','address':address,'key':'AIzaSyCF-xVAdg-Jh8b8j7BQQoFtA86QosW6GBI'}
    q = urlencode(p)
    url = surl+q
    print(url)
    print('Retrieving',url)
    uh = urlopen(url)
    data = uh.read()
    sData = data.decode('utf-8')
    m = re.search(s,sData)
    print(sData)
    print('Retrieved '+str(len(sData))+' characters')
    tree = ET.fromstring(data)
    results = tree.findall('result')
    lat = results[0].find('geometry').find('location').find('lat').text
    lng = results[0].find('geometry').find('location').find('lng').text
    location = results[0].find('formatted_address').text
    print('lat'+lat+'lng'+lng)
    print(location)
    try:
        print("Country code for "+address+" is: "+m.group(1)+"\n\n\n")
    except:
        print('There is no country code for: '+ address+"\n\n\n")


'''
1. Change either geojson.py or geoxml.py program to print out the two-char country code from the retrieved data.
2. Add error checking to your program so there is not traceback if the country code is not there
3. Use the program to search for "Pacific Ocean" and make sure that it can handle locations that are not in any country
Deliverable:
Two files as attachments at our course shell assignment page.  The first file should be the Python .py that you chose to modify.
The second file should be a screenshot image file(.png or .jpg) demonstrating the correct execuation of your program.
Please ensure that your full name is specified as a Python comment at the top of the .py file.

# Original geoxml.py
import urllib
import xml.etree.ElementTree as ET

serviceurl = 'http://maps.googleapis.com/maps/api/geocode/xml?'

while True:
    address = raw_input('Enter location: ')
    if len(address) < 1 : break

    url = serviceurl + urllib.urlencode({'sensor':'false', 'address': address})
    print 'Retrieving', url
    uh = urllib.urlopen(url)
    data = uh.read()
    print 'Retrieved',len(data),'characters'
    print data
    tree = ET.fromstring(data)


    results = tree.findall('result')
    lat = results[0].find('geometry').find('location').find('lat').text
    lng = results[0].find('geometry').find('location').find('lng').text
    location = results[0].find('formatted_address').text

    print 'lat',lat,'lng',lng
    print location
'''