#import libraries
import pandas as pd

#lead data from csv
Main_df = pd.read_csv("TotalriskNoLabel.csv")

#define conditions based on vital threshold
def condition(Main_df):    
    Risk = 0
    if (Main_df["Age"] > 35) or (Main_df["Age"] < 18):
        Risk += 1
    if (Main_df["Gage"] > 26) or (Main_df["Gage"] < 13):
        Risk += 1
    if (Main_df["BMI"]> 29) or (Main_df["BMI"]< 18):
        Risk += 1
    if (Main_df["SBP"] > 140) or (Main_df["SBP"]< 95):
        Risk += 1
    if (Main_df["DBP"] > 90) or (Main_df["DBP"]< 60):
        Risk += 1
    if (Main_df["HR"] > 112) or (Main_df["HR"]< 64):
        Risk += 1
    if (Main_df["RR"] > 24) or (Main_df["RR"]< 8):
        Risk += 1
    if (Main_df["GDM"]> 95):
        Risk += 1
    return Risk

#Add new column called Risk after calculating risk
Main_df["Risk"] = Main_df.apply(condition, axis=1)
print(Main_df["Risk"])
print(Main_df.head(10))
#Save it back to csv
Main_df.to_csv("Final.csv")
