#%%
from pycaret.classification import load_model, predict_model
from scipy.sparse import data
import streamlit as st
import pandas as pd
import base64

model = load_model('Main_lightgbm')
Diab = load_model('Diab_tuneRF')
pressure = load_model('Pressure')

def run():
    from PIL import Image
    image = Image.open('image.jpg')
    
    st.title('Prenatal Vital Monitoring System')
    st.sidebar.image(image)
    st.sidebar.info("This is an interactive and predictive web application to monitor your vitals and be informed about any possible future pregnancy related risks")

    #Capture
    age = st.number_input('Age', min_value = 14, max_value = 55, value= 21)
    Parity = st.number_input('Number of pregnancies', value = 0)
    Gage = st.number_input('Gestational age (weeks)', min_value = 1, max_value = 45)
    height = st.number_input('Height(cm)', value = 150)
    weight = st.number_input('Weight(kg)', value = 60)
    
    BMI = (weight*100*100)/(height*height)
    
    SBP = st.number_input('Systolic blood pressure', value = 120)
    DBP = st.number_input('Diastolic blood pressure', value = 80)
    #Predict Hypertension
    HT_input_dict = {'AGE':age,'PARITY':Parity,'SBP': SBP, 'DBP': DBP, 'Gage':Gage,'BMI': BMI}
    HT_input = pd.DataFrame([HT_input_dict])
    HT_pred = predict_model(pressure, data= HT_input)
    HT_val = float(HT_pred['Label'][0])
    
    if HT_val == 1:
        st.error('You have high chances of Hypertension')
    else:
        st.success('You have low chances of Hypertension')
    #Alerts for abnormality    
    HR = st.number_input('Heart rate', min_value = 50.0, max_value = 200.0, value = 111.0, step=0.1, format="%.1f")
    if HR <=63 or HR >= 113:
        st.error('Your heart rate is abnormal')
    RR = st.number_input('Respiratory rate', min_value = 5.0, max_value= 30.0, value = 20.0, step=0.1, format="%.1f")
    if RR <=7 or RR >= 24:
        st.error('Your respiratory rate is abnormal')
    SpO2 = st.number_input('Oxygen Saturation SpO2', max_value = 100.0, value = 95.0, step=0.1, format="%.1f")
    if SpO2 <= 92:
        st.error('Your Oxygen saturation is abnormal')
    BT = st.number_input('Body temperature (`C)', value =36.0, step=0.1,format="%.1f")
    if BT <= 35 or BT >= 38:
        st.error('Your body temparature is abnormal')
    GDM = st.number_input('Fasting Glucose', value = 75.0, step=0.1, format="%.1f")
        
    input_dict = {'Age':age, 'Gage': Gage, 'BMI': BMI, 'SBP': SBP, 'DBP': DBP, 'HR': HR, 'RR': RR, 'Parity': Parity, 'GDM': GDM}
    input_df = pd.DataFrame([input_dict])
    #Predict Diabetes
    diab_input_dict = {'Age':age,'Gage':Gage,'BMI': BMI,'Parity':Parity,'GDMV': GDM}
    diab_input = pd.DataFrame([diab_input_dict])
    diab_pred = predict_model(Diab, data= diab_input)
    diab_val = int(diab_pred['Label'][0])
    
    if GDM >= 100:
        st.warning('Please reduce sugar intake')
    elif diab_val == 1:
        st.error('You have high chances of gestational diabetes')
    else:
        st.success('You have low chances of gestational diabetes')
        

    if st.checkbox('Smoker'):
        smoker = 'yes'
    else:
        smoker = 'no'
    if st.checkbox('Alcohol consumption'):
        alcohol = 'yes'
    else:
        alcohol = 'no'

    history = st.selectbox('Previous health history',['None','Cancer','Anemia','major surgery','Heart related problems'])
    counter = 0
    if smoker == 'yes':
        counter += 1
    if alcohol == 'yes':
        counter += 1
    if history != 'None':
        counter += 1
    if SpO2 <= 94:
        counter +=2
    if BT <= 35 or BT >= 38:
        counter += 2
    print(counter)  
      
    output = ""    

    #Predict general
    value = 0
    if st.button('Check-up'):
        output = predict_model(model, data= input_df)
        value = int((output['Label'][0])+counter) * 10
    output = str(value) + '%'
    if value <= 35:
        Message = 'You have a low risk '
        st.success(Message)
    elif value<= 75:
        Message = 'Take more care. You have a medium risk '
        st.warning(Message)
    else:
        Message = 'Consult your caretaker. You are at high risk '
        st.error(Message)
    
    

if __name__ == '__main__':
    run()
