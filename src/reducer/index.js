const reducerData = (state = {}, action) => {
  switch (action.type) {
    case "RISK_PERCENTAGE":
      return {
        riskPercentage: action.payload,
      }
      case "PRESSURE_RISK":
      return {
        pressureRisk: action.payload,
      }
      case "DIABETES_RISK":
        return {
          diabetesRisk: action.payload,
        }
    default:
      return state
  }
}
export default reducerData
