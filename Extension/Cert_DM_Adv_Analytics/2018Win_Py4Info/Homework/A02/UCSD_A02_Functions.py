# Assignment 2
# Function
# John M Warlop
# Due 2/4/2018

import sys

def to_number(num):
  return int(num)

def add_two(i1,i2):
  return i1+i2

def cube(c1):
  return c1**3

print("The version of Python is: "+sys.version)
print("\n\nThe String Literals are '3' and '2'n\n")
print("The sum of '3' and '2' is '5', '5' to cube root is....")
print(str(cube(add_two(to_number("3"),to_number("2")))))