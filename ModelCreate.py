#%%
#import classification module
import pandas as pd
from pycaret.classification import *
#%%
data = pd.read_csv('Totalrisk.csv')
data.info()
print(data.describe())
data.hist(figsize=(10, 10))
datasetup = setup(data = data, target= 'Totalrisk', train_size=0.5, normalize= True, session_id=123)
# %%
best_model = compare_models()
#Decision Tree Classifier = 91.97% accuracy
# %%
#Create model and save
model = create_model('dt')
plot_model(model)
save_model(model, model_name= 'TotalRisk')
# %%
diab_data = pd.read_csv('diab.csv')
diab_data.info()
print(diab_data.describe())
diab_data.hist(figsize=(10, 10))
diab_datasetup = setup(data = diab_data, target= 'Risk', train_size=0.9, normalize= True, session_id=123)

# %%
best_diab_model = compare_models()

# %%
model1 = create_model('ridge')
#plot_model(model1)
save_model(model1, model_name= 'Diab')

# %%
HT_data = pd.read_csv('HT.csv')
HT_data.info()
print(HT_data.describe())
HT_data.hist(figsize=(10, 10))
HT_datasetup = setup(data = HT_data, target= 'Risk', train_size=0.8, normalize= True, session_id=123)

# %%
best_HT_model = compare_models()

# %%
model2 = create_model('qda')
plot_model(model2)
save_model(model2, model_name= 'Pressure')

# %%
