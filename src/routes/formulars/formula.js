const genetics = require("./genetics");
const unitchange = require("./unit-change");

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

  console.log("heightInFeet", heightInFeet);
  console.log("heightInMeter", heightInMeter);
  console.log("heightInCentimeter", heightInCentimeter);

  // result of calculations
  const idealWeight = genetics.getIdealBodyWeight(heightInCentimeter, sex);
  const bodyWaterWeight = genetics.getBodyWaterWeight(
    weightInKg,
    heightInCentimeter,
    age,
    sex
  );

  const adjustedBodyWeight = genetics.getAdjustedBodyWeight(
    idealWeight,
    weightInKg
  );

  let leanBodyMass = "";
  if (sex === "Male") {
    leanBodyMass = genetics.getLeanBodyMassMen(weightInKg, heightInCentimeter);
  } else {
    leanBodyMass = genetics.getLeanBodyMassWomen(
      weightInKg,
      heightInCentimeter
    );
  }
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
      idealWeight: idealWeight,
      bodyWaterWeight: bodyWaterWeight,
      adjustedBodyWeight: adjustedBodyWeight,
      leanBodyMass: leanBodyMass,
    },
  };
  return list;
}
module.exports = { calculation };
