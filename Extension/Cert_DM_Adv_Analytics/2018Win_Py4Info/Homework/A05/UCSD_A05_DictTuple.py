# Assignment 5
# Dictionaries, Tuples
# John M. Warlop
# Due 2/25/2018
# Python 3.6
#
import operator
import sys
print("The version of python is :"+sys.version)
fname = input("Input file to parse: ")
fromdict = dict()
with open(fname) as fp:
    for line in fp:
        if line.find("From:") != -1:
            l = line.split()
            if l[1] not in fromdict:
                fromdict[l[1]] = 1
            else:
                fromdict[l[1]] += 1
lt = list(fromdict.items())
fp.close()
lt.sort(key=operator.itemgetter(1),reverse=True)
print(lt[0][0]+" has "+str(lt[0][1])+" messages")
