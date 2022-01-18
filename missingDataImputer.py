import pandas as pd
from sklearn.impute import KNNImputer
import csv
import numpy as np

#Load data
data = pd.read_csv("Main.csv")
#data = pd.read_csv("Diabetes.csv")
#data = pd.read_csv("Hypertention.csv")

print(data.shape)
#replace 0 values by nan
cols = ["Age","Gage","BMI","SBP","DBP"]
data[cols] = data[cols].replace(['0', 0], np.nan)
#replace all nan by knn imputer
imputer = KNNImputer(n_neighbors=5, weights='uniform', metric='nan_euclidean')
Xtrans = imputer.fit_transform(data)

#Save to file
f = open('Totalrisk.csv', 'w', newline='')
#f = open('diab.csv', 'w', newline='')
#f = open('HT.csv', 'w', newline='')
writer = csv.writer(f)
writer.writerow(['Age','Gage','BMI','SBP','DBP','HR','RR','Parity','GDM'])
writer.writerows(Xtrans)
f.close()