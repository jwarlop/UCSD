# Assignment 3
# Looping, Searching, and Slicing
# John M Warlop
# Due 2/11/2018

x = True
aList = []
while x == True:
    y = input("Enter number of done to quit: ")
    if y == "done":
        break
    aList.append(float(y))
print(aList)
print("The count of numbers in list is: ",len(aList))
print("Maximum value of input numbers is: ",max(aList))
print("Minumum value of input numbers is: ",min(aList))
print("The average of numbers is: ",sum(aList)/len(aList))