const genetics = require("./math/genetics");
const unitchange = require("./math/unit-change");

function getWaistToHip(waist, hip) {
  return genetics.getWaistToHipRatio(waist, hip);
}

function getVo2(pulse, age) {
  return genetics.getVo2(pulse, age);
}

function getRMR(weight, height, age, sex) {
  return genetics.getRMR(weight, height, age, sex);
}

function getMET(sex, minutes, seconds) {
  return genetics.getMET(sex, minutes, seconds);
}

function calculation(sex, age, weight, height) {
  // weight
  const weightInPound = weight;
  const weightInKg = unitchange.changePoundToKg(weight);
  sex = sex.toLowerCase();

  // height
  const heightInFeet = height;
  let obj = unitchange.changeFootToMeter(heightInFeet / 10);
  let heightInMeter = obj.mt;
  const heightInCentimeter = obj.cm;

  /* result of calculations */

  // ideal weight
  const idealWeightObj = genetics.getIdealBodyWeight(heightInCentimeter, sex);
  const idealWeightInKg = idealWeightObj.kg;
  const idealWeightInPounds = idealWeightObj.pounds;

  // body water
  const bodyWaterWeightObj = genetics.getBodyWaterWeight(
    weightInKg,
    heightInCentimeter,
    age,
    sex
  );
  const bodyWaterWeightInKg = bodyWaterWeightObj.kg;
  const bodyWaterWeightInPounds = bodyWaterWeightObj.pounds;

  console.log("idealWeightInKg, weightInKg", idealWeightInKg, weightInKg);
  // adjusted body weight
  const ajbw = genetics.getAdjustedBodyWeight(idealWeightInKg, weightInKg);
  const adjustedBodyWeightInKg = ajbw.kg;
  const adjustedBodyWeightInPounds = ajbw.pounds;

  // lean body mass
  let leanBodyMassInKg = "";
  let leanBodyMassInPounds = "";
  if (sex === "male" || sex === "Male") {
    leanBodyMassInKg = genetics.getLeanBodyMassMen(
      weightInKg,
      heightInCentimeter
    ).kg;
    leanBodyMassInPounds = genetics.getLeanBodyMassMen(
      weightInKg,
      heightInCentimeter
    ).pounds;
  } else {
    leanBodyMassInKg = genetics.getLeanBodyMassWomen(
      weightInKg,
      heightInCentimeter
    ).kg;
    leanBodyMassInPounds = genetics.getLeanBodyMassWomen(
      weightInKg,
      heightInCentimeter
    ).pounds;
  }

  // blood volumn
  let bv = genetics.getBloodVolumn(sex, weightInKg, heightInMeter);

  // bmi
  let bmi = genetics.getBMI(weightInKg, heightInMeter);

  const list = {
    sex: sex,
    age: age,
    heightInFeet: heightInFeet,
    heightInMeter: heightInMeter,
    heightInCentimeter: heightInCentimeter,
    weightInPound: weightInPound,
    weightInKg: weightInKg,
    result: {
      bmi: bmi,
      idealWeightInKg: idealWeightInKg,
      idealWeightInPounds: idealWeightInPounds,
      bodyWaterWeightKg: bodyWaterWeightInKg,
      bodyWaterWeightPounds: bodyWaterWeightInPounds,
      adjustedBodyWeightInKg: adjustedBodyWeightInKg,
      adjustedBodyWeightInPounds: adjustedBodyWeightInPounds,
      leanBodyMassInKg: leanBodyMassInKg,
      leanBodyMassInPounds: leanBodyMassInPounds,
      bloodVolumn: bv,
    },
  };
  return list;
}

module.exports = { calculation, getWaistToHip, getVo2, getRMR, getMET };
