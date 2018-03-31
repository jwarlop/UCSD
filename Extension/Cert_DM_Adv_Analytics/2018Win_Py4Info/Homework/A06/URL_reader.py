# Assignment 6
# Network Programming
# John M Warlop
# Python 3.x
# Due 3/4/2018
from urllib.request import urlopen
url = input("type url(ex: www.ibm.com): ")
url = "http://"+url
try:
    res=urlopen(url)
except:
    print("Could not open "+url)
size=0
Chunk = 512
flag = False
while True:
    chunk = res.read(Chunk)
    size += len(chunk)
    if not chunk:
        break
    if size >= 3000:
        if not flag:
            print(chunk[0:440])
        flag = True
    if size < 3000:
        print(chunk)
print("Size is: "+str(size))

'''
http://constitutionus.com
1. Rename the socket1.py to URL_reader.py
2. Modify URL_reader.py to use urllib, size is still 512
3. Add code to prompt for any URL
4. Add error checking(try/except)
5. Count number of chars received and stop showing any text when 3000 chars seen
6. Continue to receive all of document, print the total number of char
Deliverable: Two files 1) URL_reader.py and png of successful running of program
Location of test file: https://www.usconstitution.net/const.txt

import urllib.request

req = urllib.request.Request('http://constitutionus.com/')
response = urllib.request.urlopen(req)
thePage = response.read()
print(thePage)
pageLength = len(thePage)
print("The length of page is: "+str(pageLength))

'''