// Unit Change

function twoDigitDecimal(value) {
  return parseFloat((Math.floor(value * 100) / 100).toFixed(2));
}

function fourDigitDecimal(value) {
  return parseFloat((Math.floor(value * 10000) / 10000).toFixed(4));
}

function changePoundToKg(value) {
  return twoDigitDecimal(value / 2.2046);
}

function changeKgToPound(value) {
  return twoDigitDecimal(value * 2.2046);
}

function removeDecimal(value) {
  return Math.trunc(value);
}

function changeFootToMeter(value) {
  let feet = Math.floor(value);
  let inches = (value * 10) % 10;
  let num = feet * 30.48 + inches * 2.54;
  let obj = { mt: fourDigitDecimal(num / 100), cm: num };

  return obj;
}

function changeCmToInches(value) {
  return twoDigitDecimal(value / 2.54);
}
module.exports = {
  twoDigitDecimal,
  fourDigitDecimal,
  changePoundToKg,
  changeFootToMeter,
  changeCmToInches,
  changeKgToPound,
  removeDecimal,
};
