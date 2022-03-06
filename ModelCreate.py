#%%
#Pipeline
#import -> get_data -> describe_data ->setup -> 
#compare_models -> create_model ->tune_model -> 
#plot_model -> evaluate -> finalize_ model -> 
#predict_model -> save_model ->load_model
#%%
#import libraries
import profile
from re import X
from matplotlib.legend import Legend
from matplotlib.pyplot import legend
from numpy import save
import pandas as pd
from pycaret.classification import *
from torch import frac
from imblearn.over_sampling import SMOTE
#%%
#get_data, description
data = pd.read_csv('Totalrisk.csv')
#data.info()
#data.hist( grid= False, figsize=(10, 10))
"""
data["Gage"].hist( grid= False, legend = True, figsize=(10, 10),bins=50)
data["BMI"].hist( grid= False, legend = True, figsize=(10, 10),bins=70)
data["SBP"].hist( grid= False, legend = True, figsize=(10, 10),bins=200)
data["DBP"].hist( grid= False, legend = True, figsize=(10, 10),bins=125)
data["HR"].hist( grid= False, legend = True, figsize=(10, 10),bins=120)
data["RR"].hist( grid= False, legend = True, figsize=(10, 10),bins=30)
data["Parity"].hist( grid= False, legend = True, figsize=(10, 10),bins=15)
data["GDM"].hist( grid= False, legend = True, figsize=(10, 10),bins=170)
   
"""
#%%
print(data.describe())
#%%
#separate unseen_data for prediction
dataset = data.sample(frac= 0.97, random_state = 150)
#data for prediction
test = data.drop(dataset.index)
## we reset the index of both datasets
dataset.reset_index(inplace=True, drop=True)
test.reset_index(inplace=True, drop=True)
print('Data for Modeling: ' + str(dataset.shape))
print('Unseen Data For Predictions: ' + str(test.shape))
#%%
#Setup using 97% of the total data
#using 90% of data for training. normalizing data eg: cm,kg etc.
#fix data imbalance using SMOTE
datasetup = setup(data = dataset, target= 'Totalrisk', train_size=0.8, normalize= True, fix_imbalance = True, profile= False ,session_id=123)
#%%
#To see what SMOTE data balancing looks like.
X = get_config('X')
y = get_config('y')
def makeOverSamplesSMOTE(X,y): 
 sm = SMOTE()
 X, y = sm.fit_sample(X, y)
 y.hist(bins = 11, figsize = (8,7), legend= True)
 return X,y
X,y = makeOverSamplesSMOTE(X,y)
#%%
#compare_models
best = compare_models(errors="raise")
# %%
rf = create_model('rf')#80
#%%
#Create model and save
dt = create_model('dt')#80
#%%
lightgbm = create_model('lightgbm')#80
#%%
valuation= evaluate_model(lightgbm)
#valuation.to_file('valuation')
#%%
#trained model object is stored in the variable 'dt', lightgbm
#plot and evaluate models
print(rf) 
print(dt)
print(lightgbm)
#%%
#tuning
#tuned_rf = tune_model(rf)
tuned_dt = tune_model(dt)
#tuned_lightgbm = tune_model(lightgbm)
#model = create_model('lightgbm')

#%%
print(tuned_rf)
print(tuned_dt)
print(tuned_lightgbm)
#%%
#model works better before tuning
#plot_model(lightgbm,'confusion_matrix', save=True)
#plot_model(lightgbm,'auc', save=True)
#plot_model(dt,'auc', save=True)
#plot_model(dt,'confusion_matrix', save=True)
#plot_model(rf,'confusion_matrix', save=True)
#plot_model(rf,'auc', save=True)
#plot_model(tuned_rf,'confusion_matrix', save=True)
#plot_model(tuned_rf,'auc', save=True)
#plot_model(tuned_lightgbm, 'auc', save= True)
#plot_model(tuned_dt, 'auc', save= True)
#plot_model(tuned_lightgbm, plot = 'confusion_matrix', save =True)
plot_model(tuned_dt, plot = 'confusion_matrix', save =True)
#%%
unseen_predictions = predict_model(tuned_dt, data=test)
unseen_predictions.head(60)
#%%
#untuned is better
unseen_predictions = predict_model(dt, data=test)
unseen_predictions.head(60)
#%%
unseen_predictions = predict_model(lightgbm, data=test)
unseen_predictions.head(60)
#%%
#untuned is better
unseen_predictions = predict_model(tuned_lightgbm, data=test)
unseen_predictions.head(60)
#%%
unseen_predictions = predict_model(tuned_rf, data=test)
unseen_predictions.head(60)
#%%
unseen_predictions = predict_model(rf, data=test)
unseen_predictions.head(60)
#%%
#plot_model(rf, plot = 'class_report', save=True)
#plot_model(dt, plot = 'class_report', save=True)
#plot_model(lightgbm, plot = 'class_report', save=True)
#plot_model(tuned_lightgbm, plot= 'class_report', save = True)
#plot_model(tuned_rf, plot= 'class_report', save = True)
plot_model(tuned_dt, plot= 'class_report', save = True)

#%%
#plot_model(rf, plot = 'error', save=True)
#plot_model(dt, plot = 'error', save=True)
#plot_model(lightgbm, plot = 'error', save=True)
#plot_model(tuned_lightgbm, plot = 'error', save=True)
#plot_model(tuned_rf, plot = 'error', save=True)
plot_model(tuned_dt, plot = 'error', save=True)

#%%

#%%
#save_model(rf, model_name='Main_rf')
#save_model(dt,model_name='Main_dt')
save_model(lightgbm, model_name= 'Main_lightgbm')
# %%
diab_data = pd.read_csv('diab.csv')
#diab_data.info()
#print(diab_data.describe())
#diab_data.hist(figsize=(10, 10), grid = False)
#%%
diab_data.head(11)
#%%
#separate unseen_data for validation
dataset = diab_data.sample(frac= 0.99, random_state = 150)

#data for validation
unseen = diab_data.drop(dataset.index)

#we reset the index of both datasets
dataset.reset_index(inplace=True, drop=True)
unseen.reset_index(inplace=True, drop=True)

print('Data for Modeling: ' + str(dataset.shape))

print('Unseen Data For Validation: ' + str(unseen.shape))
#%%
diab_datasetup = setup(data = diab_data, target= 'Risk', train_size=0.8, use_gpu= True, normalize= True, fix_imbalance = True, session_id=124)

# %%
best_diab_model = compare_models(errors="raise")
# %%
#etd = create_model('et')
rfd = create_model('rf')
#gbc = create_model('gbc')
#%%
#plot_model(etd)
#plot_model(rfd)
plot_model(gbc)
#%%
#tuning
#tuned_d_gbc = tune_model(gbc)
tuned_d_rf = tune_model(rfd)
#tune_d_etd = tune_model(etd)
#%%
#plot_model(tuned_d_gbc)
#plot_model(tuned_d_rf)
plot_model(tune_d_etd)
#%%
#plot_model(etd, plot = 'class_report', save=True)
#plot_model(rfd, plot = 'class_report', save=True)
#plot_model(gbc, plot = 'class_report', save=True)
#plot_model(gbc, plot = 'error', save=True)
#plot_model(rfd, plot = 'error', save=True)
#plot_model(etd, plot = 'error', save=True)

#plot_model(tuned_d_gbc, plot = 'class_report', save=True)
#plot_model(tuned_d_rf, plot = 'class_report', save=True)
plot_model(tune_d_etd, plot = 'class_report', save=True)
#plot_model(tuned_d_gbc, plot = 'error', save=True)
#plot_model(tuned_d_rf, plot = 'error', save=True)
plot_model(tune_d_etd, plot = 'error', save=True)
#%%
plot_model(etd,'confusion_matrix', save=True)
plot_model(etd,'auc', save=True)
#plot_model(gbc,'confusion_matrix', save=True)
#plot_model(gbc,'auc', save=True)
#plot_model(rfd,'confusion_matrix', save=True)
#plot_model(rfd,'auc', save=True)
#plot_model(tune_d_etd,'confusion_matrix', save=True)
#plot_model(tune_d_etd,'auc', save=True)
#plot_model(tuned_d_rf,'confusion_matrix', save=True)
#plot_model(tuned_d_rf,'auc', save=True)
#plot_model(tuned_d_gbc,'confusion_matrix', save=True)
#plot_model(tuned_d_gbc,'auc', save=True)
#%%
#plot_model(model1)
save_model(tuned_d_rf, model_name= 'Diab_tuneRF')

# %%
HT_data = pd.read_csv('HT.csv')
#HT_data.info()
#print(HT_data.describe())
#HT_data.hist(figsize=(10, 10),grid = False)
#%%
#print(HT_data['Risk'].describe())

#HT_data.head(11)
#%%
HT_datasetup = setup(data = HT_data, target= 'Risk', train_size=0.8, normalize= True, use_gpu = True, session_id=123)

# %%
best_HT_model = compare_models()

# %%
qda = create_model('qda')
#lr = create_model('lr')
#knn = create_model('knn')

# %%
print(qda) 
print(lr)
print(knn)
#%%
#plot_model(qda)
#plot_model(lr)
plot_model(knn)
#%%
#tuning
#tuned_ht_qda = tune_model(qda)
#tuned_ht_lr = tune_model(lr)
tune_ht_knn = tune_model(knn)
#%%
#plot_model(tuned_ht_qda)
#plot_model(tuned_ht_lr)
plot_model(tune_ht_knn)
#%%


#%%
#plot_model(qda, plot = 'class_report', save=True)
#plot_model(lr, plot = 'class_report', save=True)
#plot_model(knn, plot = 'class_report', save=True)
#plot_model(qda, plot = 'error', save=True)
#plot_model(lr, plot = 'error', save=True)
#plot_model(knn, plot = 'error', save=True)

#plot_model(tuned_ht_qda, plot = 'class_report', save=True)
#plot_model(tuned_ht_lr, plot = 'class_report', save=True)
plot_model(tune_ht_knn, plot = 'class_report', save=True)
#plot_model(tuned_ht_qda, plot = 'error', save=True)
#plot_model(tuned_ht_lr, plot = 'error', save=True)
plot_model(tune_ht_knn, plot = 'error', save=True)
#%%
#plot_model(qda,'confusion_matrix', save=True)
#plot_model(qda,'auc', save=True)
#plot_model(knn,'confusion_matrix', save=True)
#plot_model(knn,'auc', save=True)
plot_model(lr,'confusion_matrix', save=True)
plot_model(lr,'auc', save=True)

#plot_model(tuned_ht_qda,'confusion_matrix', save=True)
#plot_model(tuned_ht_qda,'auc', save=True)
#plot_model(tuned_ht_lr,'confusion_matrix', save=True)
#plot_model(tuned_ht_lr,'auc', save=True)
#plot_model(tune_ht_knn,'confusion_matrix', save=True)
#plot_model(tune_ht_knn,'auc', save=True)
#%%
evaluate_model(rf)
#%%
save_model(qda, model_name= 'Pressure')