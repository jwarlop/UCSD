# Assignment 4
# Files, Lists, and Split
# John M. Warlop
# Due 2/20/2018
# Python 3.6
#

def freq_count(sstring,wordList):
  for word in wordList:
    c = 0
    s = 0
    while word.find(sstring,s) != -1:
        i = word.find(sstring,s)
        c += 1
        s = i+1
    print(word+","+str(c))
#
script_list = []
fname = input("Enter name of file: ")
fh = open(fname,"r")
sstring = input("Enter substring to search for: ")
for line in fh:
    line_list = line.split(' ')
    for word in line_list:
        word = word.rstrip()
        word = word.strip(",.")
        if len(word) == 0:
          continue
        if len(word) == 1 and word[0] != 'a' and word[0] != 'i':
            if word[0] != 'A' and word[0] != 'I':
                continue
        if word in script_list:
            continue
        else:
            script_list.insert(0,word)
fh.close()
script_list.sort()
print(script_list)
freq_count(sstring,script_list)
