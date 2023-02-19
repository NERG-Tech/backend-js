const unitchange = require("./unit-change");

/**
 * BMI
 */

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

/**
 * Lean Body Mass
 */

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

/**
 * IBW - Robin formula
 */

function getIdealBodyWeight(heightInCentimeter, sex) {
  if (isNaN(heightInCentimeter) || heightInCentimeter <= 0)
    throw new Error("Parameter is not valid!");

  let heightInInch = unitchange.changeCmToInches(heightInCentimeter); // 66
  // console.log("idealBodyWeight heightInInch", heightInInch);

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

/**
 * Body Water Weight - P.E. Watson's formula
 */

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

/**
 * Adjusted Body Weight
 */

// IBW = 60
// ABW = 65.77

// 72.65kg + 0.4 * (90kg - 72.65kg)
function getAdjustedBodyWeight(idealBodyWeight, actualBodyWeight) {
  return {
    kg: unitchange.twoDigitDecimal(
      Math.ceil(idealBodyWeight + 0.4 * (actualBodyWeight - idealBodyWeight))
    ),
    pounds: unitchange.changeKgToPound(
      unitchange.twoDigitDecimal(
        Math.ceil(idealBodyWeight + 0.4 * (actualBodyWeight - idealBodyWeight))
      )
    ),
  };
}

/**
 * Waist to Hip Ratio
 */

function getWaistToHipRatio(waist, hip) {
  if (isNaN(waist) || waist <= 0 || isNaN(hip) || hip <= 0)
    throw new Error("Parameter is not valid!");

  return parseFloat((waist / hip).toFixed(2));
}

/**
 * Blood Volume Calculator - Nadler's Equation
 */

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

/**
 * Vo2
 */

function getVo2(pulse, age) {
  let maxHR = 208 - age * 0.7;
  return Math.round(15.3 * (maxHR / Math.floor(pulse * 3)));
}

/**
 * RMR - Harris-Benedict Calculator
 * https://www.omnicalculator.com/health/bmr-harris-benedict-equation
 */

function getRMR(weightInKg, heightInCentimeter, age, sex) {
  if (sex === "male" || sex === "Male") {
    // return Math.round(
    //   66.5 + 13.75 * weightInKg + 5.003 * heightInCentimeter - 6.75 * age
    // );
    return unitchange.removeDecimal(
      10 * weightInKg + 6.25 * heightInCentimeter - age * 5 + 5
    );
  } else {
    // return Math.floor(
    //   655.1 + 9.563 * weightInKg + 1.85 * heightInCentimeter - 4.676 * age
    // );
    return unitchange.removeDecimal(
      10 * weightInKg + 6.25 * heightInCentimeter - 5 * age - 161
    );
  }
}

/**
 * MET - Bruce Protocal METs
 * https://www.omnicalculator.com/sports/bruce-protocol-mets
 * time : the time you spent on running on a trademill
 */

function getMET(sex, minutes, seconds) {
  let T = minutes + seconds * 0.0165;
  // console.log("T", T);
  if (sex === "male" || sex === "Male") {
    return (
      (14.8 - 1.379 * T + 0.451 * Math.pow(T, 2) - 0.012 * Math.pow(T, 3)) /
      3.5
    ).toFixed(2);
  } else {
    return ((4.38 * T - 3.9) / 3.5).toFixed(2);
  }
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
  getVo2,
  getRMR,
  getMET,
};
