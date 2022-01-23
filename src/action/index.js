export const setRiskPercentage = (value) => (dispatch) => {
  dispatch({
    type: "RISK_PERCENTAGE",
    payload: value,
  })
}
export const setPressureRisk = (value) => (dispatch) => {
  dispatch({
    type: "PRESSURE_RISK",
    payload: value,
  })
}
export const setDiabetesRisk = (value) => (dispatch) => {
  dispatch({
    type: "DIABETES_RISK",
    payload: value,
  })
}