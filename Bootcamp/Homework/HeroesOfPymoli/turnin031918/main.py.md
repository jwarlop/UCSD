

```python
# Heroes Of Pymoli Data Analysis
'''John M Warlop'''
'''UCSD Bootcamp'''
'''Due 03/19/18'''
```




    'Due 03/19/18'




```python
#Import dependencies
import pandas as pd
import numpy as np
df = pd.read_json('purchase_data.json')
```


```python
df = df.rename(columns = {'Item ID':'Item_ID'})
unq_items              = df.Item_ID.nunique()
price_vector           = df['Price'].tolist()
(max_pr,min_pr)        = (max(price_vector),min(price_vector))
max_min_delta          = max_pr - min_pr
```


```python
##Player Count
```


```python
unq_players = df.SN.nunique()
u_ply = unq_players
unq_ply_df=pd.DataFrame(np.array([[u_ply]]))
unq_ply_df=unq_ply_df.rename(columns={0:'Total Players'})
unq_ply_df
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Total Players</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>573</td>
    </tr>
  </tbody>
</table>
</div>




```python
##Purchasing Analysis(Total)
```


```python
df_pur_c=pd.DataFrame({'count' : df.groupby( [ "SN", "Item_ID",'Price'] ).\
                       size()}).reset_index()
(c_list,pr_list)          = (df_pur_c['count'].tolist(),df_pur_c['Price'].tolist())
(rev_unq_pur,num_unq_pur) = sum(pr_list),len(c_list)
'''Extended Prie'''
ext_price                 = [a*b for a,b in zip(pr_list,c_list)] 
(avg_pr_unq_pur,avg_pr_all_pur) = rev_unq_pur/num_unq_pur, sum(ext_price)/sum(c_list)
pur_analysis=pd.DataFrame(np.array([[unq_items,avg_pr_all_pur,sum(c_list),sum(ext_price)]]))
pur_analysis.columns=['Number of Unique Items','Average Price',
                      'Number of Purchases','Total Revenue']
pur_analysis.round(2)
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Number of Unique Items</th>
      <th>Average Price</th>
      <th>Number of Purchases</th>
      <th>Total Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>183.0</td>
      <td>2.93</td>
      <td>780.0</td>
      <td>2286.33</td>
    </tr>
  </tbody>
</table>
</div>




```python
u_s=df.T.apply(lambda x: x.nunique(),axis=1)
```


```python
## Gender Demographics
```


```python
df_pur_gender_c=pd.DataFrame({'count' : df.\
                              groupby( [ "SN",'Gender'] ).size()}).reset_index()

```


```python
'''Make Gender and count lists'''
gender_list = df_pur_gender_c['Gender'].tolist()    
count_list  = df_pur_gender_c['count'].tolist()  
'''Male,Female and other lists'''
y=[1 if a == 'Male'   else 0 for a in gender_list]
x=[1 if a == 'Female' else 0 for a in gender_list]
z=[1 if a != 'Male' and a != 'Female' else 0 for a in gender_list]
'''Total Counts'''
(ttl_cnt_unq_male,ttl_cnt_unq_female,ttl_cnt_unq_other) = sum(y),sum(x),sum(z)
'''Percentage Breakdown of Genders'''
(per_male,per_female,per_other) = (ttl_cnt_unq_male/u_ply)*100.0,\
                                    (ttl_cnt_unq_female/u_ply)*100.0,\
                                    (ttl_cnt_unq_other/u_ply)*100.0
```


```python
'''Make dataframe to hold data'''
gender_df=pd.DataFrame(np.array([[per_male,ttl_cnt_unq_male],\
                           [per_female,ttl_cnt_unq_female],\
                           [per_other,ttl_cnt_unq_other]]))
gender_df=gender_df.rename(columns={0:'Percentage of Players',1:'Total Count'})
gender_df=gender_df.rename(index={0:'Male',1:'Female',2:'Other/Non-Disclosed'})
gender_df.round(2)
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Male</th>
      <td>81.15</td>
      <td>465.0</td>
    </tr>
    <tr>
      <th>Female</th>
      <td>17.45</td>
      <td>100.0</td>
    </tr>
    <tr>
      <th>Other/Non-Disclosed</th>
      <td>1.40</td>
      <td>8.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Purchasing Analysis(Gender)

```


```python
pur_gndr_cnt=pd.DataFrame({'count' : df.\
                              groupby( [ "Price",'Gender'] ).size()}).reset_index()

```


```python
cnt_lst        = pur_gndr_cnt['count'].tolist()
gender_lst     = pur_gndr_cnt['Gender'].tolist()
price_lst      = pur_gndr_cnt['Price'].tolist()
'''Purchase Count by Gender'''
ttl_sales_cnt_female   = sum([a for a,b in zip(cnt_lst,gender_lst) if b == 'Female'])
ttl_sales_cnt_male     = sum([a for a,b in zip(cnt_lst,gender_lst) if b == 'Male'])
ttl_sales_cnt_other    = sum(cnt_lst)-ttl_sales_cnt_female-ttl_sales_cnt_male
'''Total Sales by Gender'''
ttl_sales_female_lst = [a*b for a,b,c in zip(cnt_lst,price_lst,gender_lst) if c == 'Female']
ttl_sales_male_lst   = [a*b for a,b,c in zip(cnt_lst,price_lst,gender_lst) if c == 'Male']
ttl_sales_other_lst  = [a*b for a,b,c in zip(cnt_lst,price_lst,gender_lst) if \
                        c != 'Female' and c != 'Male']
'''Average Price per Gender'''
avg_pr_female = sum(ttl_sales_female_lst)/ttl_sales_cnt_female
avg_pr_male   = sum(ttl_sales_male_lst)/ttl_sales_cnt_male
avg_pr_other  = sum(ttl_sales_other_lst)/ttl_sales_cnt_other
'''Normalized Data'''
norm_female = sum(ttl_sales_female_lst)/ttl_cnt_unq_female
norm_male   = sum(ttl_sales_male_lst)/ttl_cnt_unq_male
norm_other  = sum(ttl_sales_other_lst)/ttl_cnt_unq_other
'''Build DataFrame'''
gender_pur_df=pd.DataFrame(np.array([\
        [ttl_sales_cnt_female,avg_pr_female,sum(ttl_sales_female_lst),norm_female],\
        [ttl_sales_cnt_male,avg_pr_male,sum(ttl_sales_male_lst),norm_male],\
        [ttl_sales_cnt_other,avg_pr_other,sum(ttl_sales_other_lst),norm_other]]))
gender_pur_df=gender_pur_df.rename(columns={0:'Purchase Count',1:'Avg Purchase Price',\
                                            2:'Total Purchase Value',3:'Normalized Totals'})
gender_pur_df=gender_pur_df.rename(index={0:'Female',1:'Male',2:'Other/Non-disclosed'})
gender_pur_df.round(2)
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Purchase Count</th>
      <th>Avg Purchase Price</th>
      <th>Total Purchase Value</th>
      <th>Normalized Totals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Female</th>
      <td>136.0</td>
      <td>2.82</td>
      <td>382.91</td>
      <td>3.83</td>
    </tr>
    <tr>
      <th>Male</th>
      <td>633.0</td>
      <td>2.95</td>
      <td>1867.68</td>
      <td>4.02</td>
    </tr>
    <tr>
      <th>Other/Non-disclosed</th>
      <td>11.0</td>
      <td>3.25</td>
      <td>35.74</td>
      <td>4.47</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Age Demographics
```


```python
age_demo_cnt=pd.DataFrame({'count' : df.\
                              groupby( [ "SN","Age"] ).size()}).reset_index()

```


```python

age_lst=age_demo_cnt['Age'].tolist()
x10 = [1 for a in age_lst if a < 10]
x14 = [1 for a in age_lst if a < 15 and a >= 10]
x19 = [1 for a in age_lst if a < 20 and a >= 15]
x24 = [1 for a in age_lst if a < 25 and a >= 20]
x29 = [1 for a in age_lst if a < 30 and a >= 25]
x34 = [1 for a in age_lst if a < 35 and a >= 30]
x39 = [1 for a in age_lst if a < 40 and a >= 35]
x40 = [1 for a in age_lst if a >= 40]
age_demo_df = pd.DataFrame(np.array([\
                                    [100.0*(sum(x10)/unq_players),sum(x10)],\
                                    [100.0*(sum(x14)/unq_players),sum(x14)],\
                                    [100.0*(sum(x19)/unq_players),sum(x19)],\
                                    [100.0*(sum(x24)/unq_players),sum(x24)],\
                                    [100.0*(sum(x29)/unq_players),sum(x29)],\
                                    [100.0*(sum(x34)/unq_players),sum(x34)],\
                                    [100.0*(sum(x39)/unq_players),sum(x39)],\
                                    [100.0*(sum(x40)/unq_players),sum(x40)]\
                                    ]))
age_demo_df=age_demo_df.rename(columns={0:'Percentage of Players',\
                                        1:'Total Count'})

age_demo_df
age_bins = {0:'<10',1:'10-14',2:'15-19',3:'20-24',4: '25-29',5:'30-34',6: '35-39',7:'40+'}
age_demo_df=age_demo_df.rename(index=age_bins)
age_demo_df

```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Percentage of Players</th>
      <th>Total Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>&lt;10</th>
      <td>3.315881</td>
      <td>19.0</td>
    </tr>
    <tr>
      <th>10-14</th>
      <td>4.013962</td>
      <td>23.0</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>17.452007</td>
      <td>100.0</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>45.200698</td>
      <td>259.0</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>15.183246</td>
      <td>87.0</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>8.202443</td>
      <td>47.0</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>4.712042</td>
      <td>27.0</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>1.919721</td>
      <td>11.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Purchasing Analysis(Age)

```


```python
pur_age_cnt=pd.DataFrame({'count' : df.\
                              groupby( [ "Price",'Age'] ).size()}).reset_index()
cnt_lst   = pur_age_cnt['count'].tolist()
age_lst   = pur_age_cnt['Age'].tolist()
price_lst = pur_age_cnt['Price'].tolist()
age_price_lst = [(a,b*c,b) for a,b,c in zip(age_lst,cnt_lst,price_lst)]#[(age,ttl,cnt)...]
ttl_pur_age_lst=[0]*100 # Will hold total purchased by given age
ttl_cnt_age_lst=[0]*100 # Will hold total count of purchased items
for i in age_price_lst:
    ttl_pur_age_lst[i[0]] = ttl_pur_age_lst[i[0]]+i[1]
    ttl_cnt_age_lst[i[0]] = ttl_cnt_age_lst[i[0]]+i[2]
'''Percentages and Counts for each bin'''
(p10,p14,p19,p24) = sum(ttl_pur_age_lst[0:10]), sum(ttl_pur_age_lst[10:15]),\
                    sum(ttl_pur_age_lst[15:20]),sum(ttl_pur_age_lst[20:25])
(p29,p34,p39,p40) = sum(ttl_pur_age_lst[25:30]),sum(ttl_pur_age_lst[30:35]),\
                    sum(ttl_pur_age_lst[35:40]),sum(ttl_pur_age_lst[40:])
(c10,c14,c19,c24) = sum(ttl_cnt_age_lst[0:10]),sum(ttl_cnt_age_lst[10:15]),\
                    sum(ttl_cnt_age_lst[15:20]),sum(ttl_cnt_age_lst[20:25])
(c29,c34,c39,c40) = sum(ttl_cnt_age_lst[25:30]),sum(ttl_cnt_age_lst[30:35]),\
                    sum(ttl_cnt_age_lst[35:40]),sum(ttl_cnt_age_lst[40:])
age_pur_anal_df = pd.DataFrame(np.array([\
                                     [c10,p10/c10,p10,p10/sum(x10)],
                                     [c14,p14/c14,p14,p14/sum(x14)],
                                     [c19,p19/c19,p19,p19/sum(x19)],
                                     [c24,p24/c24,p24,p24/sum(x24)],
                                     [c29,p29/c29,p29,p29/sum(x29)],
                                     [c34,p34/c34,p34,p34/sum(x34)],
                                     [c39,p39/c39,p39,p39/sum(x39)],
                                     [c40,p40/c40,p40,p40/sum(x40)]]))
age_pur_anal_df=age_pur_anal_df.rename(columns={0:'Purchase Count',\
                                                1:'Avg. Purchase Price',\
                                                2.:'Total Purchase Value',\
                                                3.:'Normalized Totals'})

age_pur_anal_df=age_pur_anal_df.rename(index=age_bins)
age_pur_anal_df.round(2)


```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Purchase Count</th>
      <th>Avg. Purchase Price</th>
      <th>Total Purchase Value</th>
      <th>Normalized Totals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>&lt;10</th>
      <td>28.0</td>
      <td>2.98</td>
      <td>83.46</td>
      <td>4.39</td>
    </tr>
    <tr>
      <th>10-14</th>
      <td>35.0</td>
      <td>2.77</td>
      <td>96.95</td>
      <td>4.22</td>
    </tr>
    <tr>
      <th>15-19</th>
      <td>133.0</td>
      <td>2.91</td>
      <td>386.42</td>
      <td>3.86</td>
    </tr>
    <tr>
      <th>20-24</th>
      <td>336.0</td>
      <td>2.91</td>
      <td>978.77</td>
      <td>3.78</td>
    </tr>
    <tr>
      <th>25-29</th>
      <td>125.0</td>
      <td>2.96</td>
      <td>370.33</td>
      <td>4.26</td>
    </tr>
    <tr>
      <th>30-34</th>
      <td>64.0</td>
      <td>3.08</td>
      <td>197.25</td>
      <td>4.20</td>
    </tr>
    <tr>
      <th>35-39</th>
      <td>42.0</td>
      <td>2.84</td>
      <td>119.40</td>
      <td>4.42</td>
    </tr>
    <tr>
      <th>40+</th>
      <td>17.0</td>
      <td>3.16</td>
      <td>53.75</td>
      <td>4.89</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Top Spenders
```


```python
sn_price_df=pd.DataFrame({'count' : df.\
                              groupby( [ "SN","Price"] ).size()}).reset_index()
sn_price_df
sn_lst  = sn_price_df['SN'].tolist()
pr_lst  = sn_price_df['Price'].tolist()
cnt_lst = sn_price_df['count'].tolist()
'''x[sn,num_purchased,price,ext_price]'''
x = [(a,b,c,b*c) for a,b,c in zip(sn_lst,cnt_lst,pr_lst)]
'''y={SN:ttlCount,ttlPrice,avgPrice}'''
y = {} 
'''#t[0]=SN t[1] = count, t[2] = price, t[3] == ttl_price'''
for t in x: 
    if t[0] in y: 
        y[t[0]][0]+=t[1]
        y[t[0]][1]+=t[3]
        y[t[0]][2] = y[t[0]][1]/y[t[0]][0]
    else:
        y[t[0]]=[t[1],t[3],t[2]]
sn        = [a for a in y]
cnt       = [y[x][0] for x in y]
ttl_price = [y[x][1] for x in y]
avg_price = [y[x][2] for x in y]
d={'SN': [a for a in sn],'Purchase Count':[a for a in cnt],\
    'Avg. Purchase Price': [a for a in avg_price],'Total Purchase Value':[a for a in ttl_price]}
top_sp_df=pd.DataFrame(data=d)
top_sp_sort_df = top_sp_df.sort_values(by='Total Purchase Value',ascending=False)
top_sp_sort_df.head()


```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Avg. Purchase Price</th>
      <th>Purchase Count</th>
      <th>SN</th>
      <th>Total Purchase Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>538</th>
      <td>3.412000</td>
      <td>5</td>
      <td>Undirrala66</td>
      <td>17.06</td>
    </tr>
    <tr>
      <th>428</th>
      <td>3.390000</td>
      <td>4</td>
      <td>Saedue76</td>
      <td>13.56</td>
    </tr>
    <tr>
      <th>354</th>
      <td>3.185000</td>
      <td>4</td>
      <td>Mindimnya67</td>
      <td>12.74</td>
    </tr>
    <tr>
      <th>181</th>
      <td>4.243333</td>
      <td>3</td>
      <td>Haellysu29</td>
      <td>12.73</td>
    </tr>
    <tr>
      <th>120</th>
      <td>3.860000</td>
      <td>3</td>
      <td>Eoda93</td>
      <td>11.58</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Most Popular Items
```


```python
iid_price_df=pd.DataFrame({'count' : df.groupby( \
                    [ "Item_ID","Item Name","Price"] ).size()}).reset_index()
iid_lst   = iid_price_df['Item_ID'].tolist()
pr_lst    = iid_price_df['Price'].tolist()
cnt_lst   = iid_price_df['count'].tolist()
name_lst  = iid_price_df['Item Name'].tolist()
x=[(a,b,d,c,d*c) for a,b,c,d in zip(iid_lst,name_lst,pr_lst,cnt_lst)]
d={'Item ID'             :[z[0] for z in x],'Item Name' :[z[1] for z in x],\
   'Purchase Count'      :[z[2] for z in x],'Item Price':[z[3] for z in x],\
   'Total Purchase Value':[z[4] for z in x]}
df__ = pd.DataFrame(data=d)
df__sorted = df__.sort_values(by=['Purchase Count','Total Purchase Value'],ascending=False)
df__sorted.head()



```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Item Price</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>39</th>
      <td>39</td>
      <td>Betrayal, Whisper of Grieving Widows</td>
      <td>2.35</td>
      <td>11</td>
      <td>25.85</td>
    </tr>
    <tr>
      <th>84</th>
      <td>84</td>
      <td>Arcane Gem</td>
      <td>2.23</td>
      <td>11</td>
      <td>24.53</td>
    </tr>
    <tr>
      <th>34</th>
      <td>34</td>
      <td>Retribution Axe</td>
      <td>4.14</td>
      <td>9</td>
      <td>37.26</td>
    </tr>
    <tr>
      <th>31</th>
      <td>31</td>
      <td>Trickster</td>
      <td>2.07</td>
      <td>9</td>
      <td>18.63</td>
    </tr>
    <tr>
      <th>13</th>
      <td>13</td>
      <td>Serenity</td>
      <td>1.49</td>
      <td>9</td>
      <td>13.41</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Most Profitable Items
```


```python
df__sorted = df__.sort_values(by=['Total Purchase Value'],ascending=False)
df__sorted.head()

```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Item ID</th>
      <th>Item Name</th>
      <th>Item Price</th>
      <th>Purchase Count</th>
      <th>Total Purchase Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>34</th>
      <td>34</td>
      <td>Retribution Axe</td>
      <td>4.14</td>
      <td>9</td>
      <td>37.26</td>
    </tr>
    <tr>
      <th>115</th>
      <td>115</td>
      <td>Spectral Diamond Doomblade</td>
      <td>4.25</td>
      <td>7</td>
      <td>29.75</td>
    </tr>
    <tr>
      <th>32</th>
      <td>32</td>
      <td>Orenmir</td>
      <td>4.95</td>
      <td>6</td>
      <td>29.70</td>
    </tr>
    <tr>
      <th>103</th>
      <td>103</td>
      <td>Singed Scalpel</td>
      <td>4.87</td>
      <td>6</td>
      <td>29.22</td>
    </tr>
    <tr>
      <th>107</th>
      <td>107</td>
      <td>Splitter, Foe Of Subtlety</td>
      <td>3.61</td>
      <td>8</td>
      <td>28.88</td>
    </tr>
  </tbody>
</table>
</div>


