# John M. Warlop
# UCSD Data Visualization Bootcamp
# Python Challenge Homework PyBank
# Homework #3
import os
import csv
import time

# flattenData
# flattens out the data in the year dictionary
#
def flattenData(year_dict): #[[12,12,12],[Oct,Nov,Dec],[234234,234234,-234234]]
    flat_data = [[],[],[]] #idx 0: year, idx 1: idx 1: Month, idx 2: revenue
    for year in year_dict:
        i = 0
        for element in year_dict[year]:
            if i == 0:
                i += 1
                flat_data[0].append(year)
                flat_data[1].append(element)
            else:
                flat_data[2].append(element)
                i = 0
    return(flat_data)

# analysis
# performs all the data analysis in requirements
def analysis(flat_data):
    (report,ylen,mlen,rlen)=({},len(flat_data[0]),len(flat_data[1]),len(flat_data[2]))
    report = {}
    if ylen == mlen and mlen == rlen: #properly dimensions
        (delta_sum,count,max_delta,min_delta,ttlRev) = (0,0,-9999999999,9999999999,0)
        for i in range(0,ylen-1): #
            ttlRev = flat_data[2][i] + ttlRev
            delta = flat_data[2][i+1]-flat_data[2][i]# delta between two months
            if delta >= max_delta: #
                max_delta = delta
                report['max']=(flat_data[0][i+1],flat_data[1][i+1],max_delta)#('YY','Jan',232323)
            if delta <= min_delta:
                min_delta = delta
                report['min']=(flat_data[0][i+1],flat_data[1][i+1],min_delta)#('yy','MMM',min)
            count += 1
            delta_sum = delta_sum + delta
        report['avg_delta']=delta_sum/count
        ttlRev = ttlRev + flat_data[2][-1] #Get the last month
        report['ttlRev']=ttlRev
    else:
        quit()
    return(report)

def process_rows(csvreader):
    (count,ttl_months,years)=(0,0,{})
    for row in csvreader:
        if count == 0: 
            count += 1
            continue #1st row is header, don't need it
        ttl_months += 1
        if len(row[0]) == 8: #Format is Jan-2009
            s = 6
            e = len(row[0])
        else:#Format is Jan-09
            s = 4
            e = len(row[0])
        if not row[0][s:e] in years:
            years[row[0][s:e]]=[row[0][0:3],\
                int(row[1])]# years={12:['Jan',1234,'Feb',4567,...]}
        else:
            #months[row[0][0:3]].extend([row[0][4:6],int(row[1])])
            years[row[0][s:e]].extend([row[0][0:3],int(row[1])])
    return(ttl_months,years)

def build_report(report_dict,ttl_months,fname):
    oStr = ''
    oStr = oStr+"\n\n\n\n\n"
    oStr+="{0}".format("Financial Analysis for {0}\n".\
        format(fname))
    oStr+="{0}\n".format("-----------------------------------")
    oStr+="Total Months: {0}\n".format(ttl_months)
    (min_month,min_year)=(report_dict["min"][1],report_dict["min"][0])
    (max_month,max_year)=(report_dict["max"][1],report_dict["max"][0])
    (min_rev,max_rev)=(report_dict["min"][2],report_dict["max"][2])
    oStr+="Total Revenue: ${0}\n".format(report_dict["ttlRev"])
    oStr+="Average Revenue Change: ${0:.2f}\n".\
        format(report_dict["avg_delta"])
    oStr+="Greatest Increase in Revenue: {1}-{0} (${2})\n".\
        format(max_year,max_month,max_rev)
    oStr+="Greatest Decrease in Revenue: {1}-{0} (${2})\n".\
        format(min_year,min_month,min_rev)
    return(oStr)
    
# write_report
# Writes report to stdio and file(s)
def write_report(report,fname):
    timestr = time.strftime("%Y%m%d-%H%M%S")#time stamp for files and logs
    print(report)
    oname=os.path.join('raw_data',fname[0:-4])
    oname=oname+"_"+timestr
    oname+='.txt'
    with open(oname,'w') as f:
        f.write(report)

# Data input
data_files = ['budget_data_1.csv','budget_data_2.csv']

cwd = os.getcwd()
for fname in data_files:
    csvpath = os.path.join('raw_data', fname)
    with open(csvpath, newline='') as csvfile:
        # CSV reader specifies delimiter and variable that holds contents
        csvreader = csv.reader(csvfile, delimiter=',')
        #  Each row is read as a row
        (ttl_months,years)=process_rows(csvreader)
        csvfile.close()
    flat_data = flattenData(years)#returns a 3xn array
    report_dict = analysis(flat_data)
    report = build_report(report_dict,ttl_months,fname)
    write_report(report,fname)
