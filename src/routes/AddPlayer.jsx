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

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [backendResult, setBackendResult] = useState(null);
  const [localList, setLocalList] = useState(null);

  const onSubmit = async (data) => {
    console.log("data", data);
    const { weight, height, age, sex } = data;
    setSuccess(false);
    setIsSigningIn(true);
    setErrorMessage(false);

    try {
      setLocalList(formula.calculation(sex, age, weight, height));
      await apiService.addPlayer(sex, age, weight, height).then((result) => {
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
  // console.log("localList", localList.result);
  // console.log("success", success);

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
                  {localList.heightInFeet % 10} inches
                </div>
                <div>heightInCentimeter: {localList.heightInCentimeter} cm</div>
                <div>heightInMeter: {localList.heightInMeter} cm</div>
                <br />
                <div>age: {localList.age} years old</div>
                <div>sex: {localList.sex}</div>
                <br />
                <div>weightInPound: {localList.weightInPound} pounds</div>
                <div>weightInKg: {localList.weightInKg} kg</div>
                <br />
                <div>bmi: {localList.result.bmi} kg</div>
                <div>
                  bodyWaterWeight: {localList.result.bodyWaterWeight} kg
                </div>
                <div>idealWeight: {localList.result.idealWeight} kg</div>
                <div>leanBodyMass: {localList.result.leanBodyMass} kg</div>
                {/* <div>
                  adjustedBodyWeight: {localList.result.adjustedBodyWeight} kg
                </div> */}
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
