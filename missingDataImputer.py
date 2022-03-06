import pandas as pd
from sklearn.impute import KNNImputer
import csv
import numpy as np

#Load data
data = pd.read_csv("Main.csv")
#data = pd.read_csv("Diabetes.csv")
#data = pd.read_csv("Hypertention.csv")
print(data.isna().sum())
"""
Age         52
Gage         4
BMI        262
SBP          0
DBP          0
HR        2033
RR        2033
Parity     172
GDM       1443
"""
print(data.shape)
"""
(2159, 9)
"""
#replace 0 values by nan
cols = ["Age","Gage","BMI","SBP","DBP"]
data[cols] = data[cols].replace(['0', 0], np.nan)
#replace all nan by knn imputer
imputer = KNNImputer(n_neighbors=5, weights='uniform', metric='nan_euclidean')
Xtrans = imputer.fit_transform(data)

#Save to file
f = open('TotalriskNoLabel.csv', 'w', newline='')
#f = open('diab.csv', 'w', newline='')
#f = open('HT.csv', 'w', newline='')
writer = csv.writer(f)
writer.writerow(['Age','Gage','BMI','SBP','DBP','HR','RR','Parity','GDM'])
writer.writerows(Xtrans)
f.close()