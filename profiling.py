#%%
import pandas_profiling
import pandas as pd
#%%
df= pd.read_csv("Totalrisk.csv")
mainDataProfile = pandas_profiling.ProfileReport(df)
mainDataProfile.to_file('mainDataProfile.html')
#%%
df_diab = pd.read_csv("diab.csv")
diabDataProfile = pandas_profiling.ProfileReport(df_diab)
diabDataProfile.to_file('diabDataProfile.html')
# %%
ht_diab = pd.read_csv("HT.csv")
htDataProfile = pandas_profiling.ProfileReport(ht_diab)
htDataProfile.to_file('htDataProfile')
#%%
raw_db_1 = pd.read_csv("")