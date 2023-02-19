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
import * as formula from "./formula/formula";

export default function AddPlayer() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [localList, setLocalList] = useState(null);
  //
  const [whList, setWhList] = useState(null);
  const [vo2, setVo2] = useState(null);
  const [met, setMet] = useState(null);

  let waist = 50;
  let hip = 40;

  let beats = 200;

  let minutes = 20;
  let seconds = 20;

  let neckCircumference = 10,
    wingSpan = 20,
    handSize = 30,
    hipsCircumference = 40,
    gluteCircumference = 50,
    waistCircumference = 60;

  const onSubmit = async (data) => {
    console.log("data", data);
    const { weight, height, age, sex } = data;
    setSuccess(false);
    setIsSigningIn(true);
    setErrorMessage(false);

    try {
      setLocalList(formula.calculation(sex, age, weight, height));

      setWhList(formula.getWaistToHip(waist, hip));
      let vo2 = formula.getVo2(beats, age);
      setVo2(vo2);

      setMet(formula.getMET(sex, minutes, seconds));

      await apiService.addPlayer(sex, age, weight, height).then((result) => {
        console.log(result);
        if (result.list) {
          setSuccess(true);
          setErrorMessage(false);
        }
      });
      // await apiService.addWaistAndHip(50, 40).then((result) => {
      //   console.log(result);
      //   if (result.list) {
      //     setSuccess(true);
      //     setErrorMessage(false);
      //   }
      // });
      // await apiService.getVo2(120).then((result) => {
      //   console.log(result);
      //   if (result.list) {
      //     setSuccess(true);
      //     setErrorMessage(false);
      //   }
      // });
      // await apiService.getMET(minutes, seconds).then((result) => {
      //   console.log(result);
      //   if (result.list) {
      //     setSuccess(true);
      //     setErrorMessage(false);
      //   }
      // });
      // await apiService
      //   .getKeyMeasurements(
      //     neckCircumference,
      //     wingSpan,
      //     handSize,
      //     hipsCircumference,
      //     gluteCircumference,
      //     waistCircumference
      //   )
      //   .then((result) => {
      //     console.log(result);
      //     if (result.list) {
      //       setSuccess(true);
      //       setErrorMessage(false);
      //     }
      //   });
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
              <div style={{ paddingTop: "10px", lineHeight: "210%" }}>
                <div>Age: {localList.age}</div>
                <div>bmi: {localList.bmi}</div>
                <div>sex: {localList.sex}</div>
                <hr />
                <div>height: {localList.height.cm} cm</div>
                <div>
                  height: {localList.height.feet.feet} feet{" "}
                  {localList.height.feet.inch} inch
                </div>
                <hr />
                <div>weight: {localList.weight.kg} kg</div>
                <div>weight: {localList.weight.pounds} pounds</div>
                <hr />
                <div>
                  adjustedBodyWeight: {localList.adjustedBodyWeight.kg} kg
                </div>
                <div>
                  adjustedBodyWeight: {localList.adjustedBodyWeight.pounds}{" "}
                  pounds
                </div>
                <hr />
                <div>
                  bloodVolumn: {localList.bloodVolumn.value}{" "}
                  {localList.bloodVolumn.unit}
                </div>
                <hr />
                <div>bodyWaterWeight: {localList.bodyWaterWeight.kg} kg</div>
                <div>
                  bodyWaterWeight: {localList.bodyWaterWeight.pounds} pounds
                </div>
                <hr />
                <div>idealWeight: {localList.idealWeight.kg} kg</div>
                <div>idealWeight: {localList.idealWeight.pounds} pounds</div>
                <hr />
                <div>leanBodyMass: {localList.leanBodyMass.kg} kg</div>
                <div>leanBodyMass: {localList.leanBodyMass.pounds} pounds</div>
                <hr />
                <div>
                  RMR: {localList.rmr.value} {localList.rmr.unit}
                </div>
                <hr />
                <div>
                  Waist Hip List: {whList} ** with waist: {waist}, hip: {hip}
                </div>
                <hr />
                <div>
                  Vo2 Max: {vo2} ml/kg/min ** with beats: {beats} per 20 seconds
                </div>
                <div>
                  MET: {met} METs ** with {minutes} minutes {seconds} seconds
                </div>
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
