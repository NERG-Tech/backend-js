// import { twoDigitDecimal, changeCmToInches } from "./unit-change";

const unitchange = require("./unit-change");
// BMI

function getBMI(weight, height) {
  if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0)
    throw new Error("Parameter is not a number!");

  let bmi;
  bmi = weight / height / height;
  return parseFloat(bmi.toFixed(1));
}

function getBmiStatus(bmi) {
  if (isNaN(bmi) || bmi === 0 || bmi < 0)
    throw new Error("Parameter is not a number!");

  if (bmi < 18.5) {
    return "Under Weight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Nomal Weight";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Over Weight";
  } else {
    return "Sever Obesity";
  }
}

// Lean Body Mass

function getLeanBodyMassMen(weight, height) {
  let obj = {
    kg: unitchange.twoDigitDecimal(
      parseFloat((0.407 * weight + 0.267 * height - 19.2).toFixed(2))
    ),
    pounds: unitchange.twoDigitDecimal(
      unitchange.changeKgToPound(
        parseFloat((0.407 * weight + 0.267 * height - 19.2).toFixed(2))
      )
    ),
  };
  return obj;
}

function getLeanBodyMassWomen(weight, height) {
  let obj = {
    kg: unitchange.twoDigitDecimal(
      unitchange.twoDigitDecimal(0.252 * weight + 0.473 * height - 48.3)
    ),
    pounds: unitchange.twoDigitDecimal(
      unitchange.changeKgToPound(0.252 * weight + 0.473 * height - 48.3)
    ),
  };
  return obj;
}

// IBW - Robin formula

function getIdealBodyWeight(heightInCentimeter, sex) {
  if (isNaN(heightInCentimeter) || heightInCentimeter <= 0)
    throw new Error("Parameter is not valid!");

  let heightInInch = unitchange.changeCmToInches(heightInCentimeter); // 66
  console.log("idealBodyWeight heightInInch", heightInInch);

  if (heightInCentimeter <= 153) {
    return parseFloat(
      ((heightInCentimeter * heightInCentimeter * 1.65) / 1000).toFixed(2)
    );
  } else {
    if (sex === "male") {
      let rest = heightInInch - 61; // heightInInch 66 - 61 = 6 inches
      let ideal = 52 + rest * 1.9; // 52 Kg + 6 * 1.9
      return {
        kg: Math.round(ideal),
        pounds: unitchange.changeKgToPound(Math.round(ideal)),
      };
    } else {
      let rest = heightInInch - 61;
      let ideal = 49 + rest * 1.7;
      return {
        kg: Math.round(ideal),
        pounds: unitchange.changeKgToPound(Math.round(ideal)),
      };
    }
  }
}

// Body Water Weight - P.E. Watson's formula

function getBodyWaterWeight(weightInKg, heightInCentimeter, age, sex) {
  if (sex === "male") {
    return {
      kg: parseFloat(
        (
          2.447 -
          0.09156 * age +
          0.1074 * heightInCentimeter +
          0.3362 * weightInKg
        ).toFixed(2)
      ),
      pounds: unitchange.changeKgToPound(
        parseFloat(
          (
            2.447 -
            0.09156 * age +
            0.1074 * heightInCentimeter +
            0.3362 * weightInKg
          ).toFixed(2)
        )
      ),
    };
  } else {
    return {
      kg: parseFloat(
        (-2.097 + 0.1069 * heightInCentimeter + 0.2466 * weightInKg).toFixed(2)
      ),
      pounds: unitchange.changeKgToPound(
        parseFloat(
          (-2.097 + 0.1069 * heightInCentimeter + 0.2466 * weightInKg).toFixed(
            2
          )
        )
      ),
    };
  }
}

// Adjusted Body Weight

function getAdjustedBodyWeight(idealBodyWeight, actualBodyWeight) {
  return (
    idealBodyWeight + 0.4 * (actualBodyWeight - idealBodyWeight).toFixed(0)
  );
}

// Waist to Hip Ratio

function getWaistToHipRatio(waist, hip) {
  if (isNaN(waist) || waist <= 0 || isNaN(hip) || hip <= 0)
    throw new Error("Parameter is not valid!");

  return parseFloat((waist / hip).toFixed(2));
}

// Blood Volume Calculator - Nadler's Equation

function getBloodVolumn(sex, weightInKg, heightInMeter) {
  if (
    !sex ||
    isNaN(weightInKg) ||
    weightInKg <= 0 ||
    isNaN(heightInMeter) ||
    heightInMeter <= 0
  )
    throw new Error("Parameter is not valid!");

  if (sex === "male") {
    return parseFloat(
      literToML(
        0.3669 * (heightInMeter * heightInMeter * heightInMeter) +
          0.03219 * weightInKg +
          0.6041
      ).toFixed(0)
    );
  } else {
    return parseFloat(
      literToML(
        0.3561 * (heightInMeter * heightInMeter * heightInMeter) +
          0.03308 * weightInKg +
          0.1833
      ).toFixed(0)
    );
  }
}

function literToML(value) {
  return value * 1000;
}

module.exports = {
  getBMI,
  getBmiStatus,
  getLeanBodyMassMen,
  getLeanBodyMassWomen,
  literToML,
  getIdealBodyWeight,
  getBodyWaterWeight,
  getAdjustedBodyWeight,
  getWaistToHipRatio,
  getBloodVolumn,
};
