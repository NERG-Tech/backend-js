import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import * as apiService from "../api-service";
import * as formula from "./formulars/formula";

export default function AddPlayer() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const check = <span>&#10003;</span>;

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [backendResult, setBackendResult] = useState(null);
  const [localList, setLocalList] = useState(null);
  const [whList, setWhList] = useState(null);
  const [vo2, setVo2] = useState(null);
  const [rmr, setRmr] = useState(null);

  console.log("vo2", vo2);

  const onSubmit = async (data) => {
    console.log("data", data);
    const { weight, height, age, sex } = data;
    setSuccess(false);
    setIsSigningIn(true);
    setErrorMessage(false);

    try {
      let list = formula.calculation(sex, age, weight, height);
      setLocalList(formula.calculation(sex, age, weight, height));
      setWhList(formula.getWaistToHip(50, 40));
      setVo2(formula.getVo2(120, age));
      setRmr(
        formula.getRMR(list.weightInKg, list.heightInCentimeter, age, sex)
      );

      await apiService.addPlayer(sex, age, weight, height).then((result) => {
        console.log(result);
        if (result.list) {
          setBackendResult(result.list);
          setSuccess(true);
          setErrorMessage(false);
        }
      });
      await apiService.addWaistAndHip(50, 40).then((result) => {
        console.log(result);
        if (result.list) {
          setBackendResult(result.list);
          setSuccess(true);
          setErrorMessage(false);
        }
      });
      await apiService.getVo2(120).then((result) => {
        console.log(result);
        if (result.list) {
          setBackendResult(result.list);
          setSuccess(true);
          setErrorMessage(false);
        }
      });
    } catch (error) {
      setError(error);
      setSuccess(false);
      setErrorMessage(true);
    } finally {
      setIsSigningIn(false);
    }
  };

  const [isSigningIn, setIsSigningIn] = useState(false);

  console.log("localList", localList);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Controller
          control={control}
          name="weight"
          rules={{ required: "Enter a weight" }}
          render={({ field }) => (
            <TextField
              label="weight"
              {...field}
              helperText={errors.weight?.message}
              error={Boolean(errors.weight)}
              sx={{ marginTop: 2 }}
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="height"
          rules={{ required: "Enter a height" }}
          render={({ field }) => (
            <TextField
              label="height"
              {...field}
              helperText={errors.height?.message}
              error={Boolean(errors.height)}
              sx={{ marginTop: 2 }}
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="age"
          rules={{ required: "Enter a age" }}
          render={({ field }) => (
            <TextField
              label="age"
              {...field}
              helperText={errors.age?.message}
              error={Boolean(errors.age)}
              sx={{ marginTop: 2 }}
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="sex"
          rules={{ required: "Enter a sex" }}
          render={({ field }) => (
            <TextField
              label="sex"
              {...field}
              helperText={errors.sex?.message}
              error={Boolean(errors.sex)}
              sx={{ marginTop: 2 }}
              type="text"
            />
          )}
        />
        <LinearProgress
          variant="indeterminate"
          sx={{
            visibility: isSigningIn ? "visible" : "hidden",
            marginTop: 2,
          }}
        />
        <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
          Add a Player
        </Button>

        <Box sx={{ pt: 2 }}>
          <Typography>{success && "Player is successfully added."}</Typography>

          <Typography>
            {localList && (
              <div style={{ paddingTop: "10px" }}>
                <div>
                  heightInFeet: {Math.floor(localList.heightInFeet / 10)} feet{" "}
                  {localList.heightInFeet % 10} inches &#10003;
                </div>
                <div>
                  heightInCentimeter: {localList.heightInCentimeter} cm {check}
                </div>
                <div>
                  heightInMeter: {localList.heightInMeter} cm {check}
                </div>
                <br />
                <div>
                  age: {localList.age} years old {check}
                </div>
                <div>
                  sex: {localList.sex} {check}
                </div>
                <br />
                <div>
                  weightInPound: {localList.weightInPound} pounds {check}
                </div>
                <div>
                  weightInKg: {localList.weightInKg} kg {check}
                </div>
                <br />
                <div>
                  bmi: {localList.result.bmi} {check}
                </div>
                <div>
                  bodyWaterWeightKg: {localList.result.bodyWaterWeightKg} kg
                  {check}
                </div>
                <div>
                  bodyWaterWeightPounds:{" "}
                  {localList.result.bodyWaterWeightPounds} lbs
                  {check}
                </div>
                <div>
                  idealWeightInKg: {localList.result.idealWeightInKg} kg {check}
                </div>
                <div>
                  idealWeightInPounds: {localList.result.idealWeightInPounds}{" "}
                  lbs {check}
                </div>
                <div>
                  leanBodyMassInPounds: {localList.result.leanBodyMassInPounds}{" "}
                  lbs {check}
                </div>
                <div>
                  leanBodyMassInPounds: {localList.result.leanBodyMassInKg} kg{" "}
                  {check}
                </div>
                <br />
                <Box>Hip and Waist Ratio: {whList}</Box>
                <Box>100 beats / 20 sec = Vo2: {vo2}</Box>
                <Box>RMR: {rmr} kcal / day</Box>
                <Box>Blood Volumn: {localList.result.bloodVolumn} ml</Box>
              </div>
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: 2,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              visibility: errorMessage ? "visible" : "hidden",
            }}
            color="error"
          >
            {"Can't add the player. Check your input."}
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
