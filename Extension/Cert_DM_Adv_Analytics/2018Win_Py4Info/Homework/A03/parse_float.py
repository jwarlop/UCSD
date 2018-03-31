# Assignment 3
# Looping, Searching, and Slicing
# John M Warlop
# Due 2/11/2018
import sys

def eval_string(s):
    x = s.find(':')
    s = s[x+1:]
    s = s.split()
    s2 = s[0].split('.')
    f1 = float(s2[0]+'.'+s2[1])
    print("Float is: "+str(f1))
#
print("Version of Python is: "+sys.version)
avg_str = 'Average value read: 0.72903'
print("The string to be evaluated is: "+avg_str)
while True:
    x = input("Enter a floating point number: ")
    if float(x) == 0.0:
      break
    avg_str = "Average value read: "+ x
    y = eval_string(avg_str)
