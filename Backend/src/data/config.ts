// config.js - Configuration for different assessment types
export const reportConfigurations = {
  as_hr_02: {
    name: "Health & Fitness Assessment",
    sections: [
      "Key Body Vitals",
      "Heart Health",
      "Stress Level",
      "Fitness Levels",
      "Posture",
      "Body Composition",
    ],
    fieldMappings: {
      "Overall Health Score": {
        path: "accuracy",
        unit: "%",
        section: "Key Body Vitals",
      },
      "Heart Rate": {
        path: "vitalsMap.vitals.heart_rate",
        unit: "bpm",
        section: "Key Body Vitals",
      },
      "Blood Pressure Systolic": {
        path: "vitalsMap.vitals.bp_sys",
        unit: "mmHg",
        section: "Key Body Vitals",
      },
      "Blood Pressure Diastolic": {
        path: "vitalsMap.vitals.bp_dia",
        unit: "mmHg",
        section: "Key Body Vitals",
      },
      "Oxygen Saturation": {
        path: "vitalsMap.vitals.oxy_sat_prcnt",
        unit: "%",
        section: "Key Body Vitals",
      },
      "Respiratory Rate": {
        path: "vitalsMap.vitals.resp_rate",
        unit: "breaths/min",
        section: "Key Body Vitals",
      },
      "Heart Rate Variability": {
        path: "vitalsMap.metadata.heart_scores.rmssd",
        unit: "ms",
        section: "Heart Health",
      },
      "Max Heart Rate": {
        path: "vitalsMap.metadata.heart_scores.HRMax",
        unit: "bpm",
        section: "Heart Health",
      },
      "Stress Index": {
        path: "vitalsMap.metadata.heart_scores.stress_index",
        unit: "",
        section: "Stress Level",
      },
      "Heart Zone": {
        path: "vitalsMap.metadata.heart_scores.zone_details.zone",
        unit: "",
        section: "Stress Level",
      },
      "VO2 Max": {
        path: "vitalsMap.metadata.physiological_scores.vo2max",
        unit: "ml/kg/min",
        section: "Fitness Levels",
      },
      "Exercise Duration": {
        path: "exercises[235].setList[0].time",
        unit: "seconds",
        section: "Fitness Levels",
      },
      "Intensity Level": {
        path: "vitalsMap.metadata.physiological_scores.intensity",
        unit: "",
        section: "Fitness Levels",
      },
      "Posture Analysis Score": {
        path: "exercises[73].analysisScore",
        unit: "%",
        section: "Posture",
      },
      "Side View Score": {
        path: "exercises[74].analysisScore",
        unit: "%",
        section: "Posture",
      },
      BMI: {
        path: "bodyCompositionData.BMI",
        unit: "kg/m²",
        section: "Body Composition",
      },
      "Body Fat Percentage": {
        path: "vitalsMap.metadata.physiological_scores.bodyfat",
        unit: "%",
        section: "Body Composition",
      },
      "Muscle Mass": {
        path: "bodyCompositionData.LM",
        unit: "kg",
        section: "Body Composition",
      },
      "Basal Metabolic Rate": {
        path: "bodyCompositionData.BMR",
        unit: "kcal/day",
        section: "Body Composition",
      },
    },
    classifications: {
      "Heart Rate": {
        excellent: { min: 60, max: 70 },
        good: { min: 71, max: 80 },
        average: { min: 81, max: 90 },
        poor: { min: 91, max: 120 },
      },
      BMI: {
        underweight: { min: 0, max: 18.5 },
        normal: { min: 18.5, max: 25 },
        overweight: { min: 25, max: 30 },
        obese: { min: 30, max: 50 },
      },
      "Overall Health Score": {
        excellent: { min: 80, max: 100 },
        good: { min: 60, max: 79 },
        average: { min: 40, max: 59 },
        poor: { min: 0, max: 39 },
      },
      "Stress Index": {
        low: { min: 0, max: 1.0 },
        normal: { min: 1.1, max: 2.0 },
        high: { min: 2.1, max: 3.0 },
        very_high: { min: 3.1, max: 10 },
      },
      "VO2 Max": {
        excellent: { min: 70, max: 100 },
        good: { min: 50, max: 69 },
        average: { min: 30, max: 49 },
        poor: { min: 0, max: 29 },
      },
    },
  },
  as_card_01: {
    name: "Cardiac Assessment",
    sections: [
      "Key Body Vitals",
      "Cardiovascular Endurance",
      "Body Composition",
    ],
    fieldMappings: {
      "Overall Health Score": {
        path: "accuracy",
        unit: "%",
        section: "Key Body Vitals",
      },
      "Heart Rate": {
        path: "vitalsMap.vitals.heart_rate",
        unit: "bpm",
        section: "Key Body Vitals",
      },
      "Blood Pressure Systolic": {
        path: "vitalsMap.vitals.bp_sys",
        unit: "mmHg",
        section: "Key Body Vitals",
      },
      "Blood Pressure Diastolic": {
        path: "vitalsMap.vitals.bp_dia",
        unit: "mmHg",
        section: "Key Body Vitals",
      },
      "Oxygen Saturation": {
        path: "vitalsMap.vitals.oxy_sat_prcnt",
        unit: "%",
        section: "Key Body Vitals",
      },
      "Respiratory Rate": {
        path: "vitalsMap.vitals.resp_rate",
        unit: "breaths/min",
        section: "Key Body Vitals",
      },
      "Cardiac Output": {
        path: "vitalsMap.metadata.cardiovascular.cardiac_out",
        unit: "L/min",
        section: "Cardiovascular Endurance",
      },
      "Exercise Duration": {
        path: "exercises[235].setList[0].time",
        unit: "seconds",
        section: "Cardiovascular Endurance",
      },
      "Heart Rate Variability": {
        path: "vitalsMap.metadata.heart_scores.rmssd",
        unit: "ms",
        section: "Cardiovascular Endurance",
      },
      BMI: {
        path: "bodyCompositionData.BMI",
        unit: "kg/m²",
        section: "Body Composition",
      },
      "Body Fat Percentage": {
        path: "vitalsMap.metadata.physiological_scores.bodyfat",
        unit: "%",
        section: "Body Composition",
      },
      "Muscle Mass": {
        path: "bodyCompositionData.LM",
        unit: "kg",
        section: "Body Composition",
      },
    },
    classifications: {
      "Heart Rate": {
        excellent: { min: 60, max: 70 },
        good: { min: 71, max: 80 },
        average: { min: 81, max: 90 },
        poor: { min: 91, max: 120 },
      },
      BMI: {
        underweight: { min: 0, max: 18.5 },
        normal: { min: 18.5, max: 25 },
        overweight: { min: 25, max: 30 },
        obese: { min: 30, max: 50 },
      },
      "Overall Health Score": {
        excellent: { min: 80, max: 100 },
        good: { min: 60, max: 79 },
        average: { min: 40, max: 59 },
        poor: { min: 0, max: 39 },
      },
      "Cardiac Output": {
        excellent: { min: 6.0, max: 8.0 },
        good: { min: 5.0, max: 5.9 },
        average: { min: 4.0, max: 4.9 },
        poor: { min: 2.0, max: 3.9 },
      },
    },
  },
};

// Add new assessment types here by following the same structure
// Example of how to add a new assessment:
/*
"as_new_assessment_01": {
  name: "New Assessment Type",
  sections: [
    "Section 1",
    "Section 2"
  ],
  fieldMappings: {
    "Field Name": {
      path: "json.path.to.field",
      unit: "unit",
      section: "Section 1"
    }
  },
  classifications: {
    "Field Name": {
      excellent: { min: 80, max: 100 },
      good: { min: 60, max: 79 },
      average: { min: 40, max: 59 },
      poor: { min: 0, max: 39 }
    }
  }
}
*/
