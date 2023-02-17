import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import isEmail from "is-email";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth";
import * as apiService from "../api-service";

export default function AddPlayer() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  //   const navigate = useNavigate();
  //   const { signIn } = useAuth();

  const onSubmit = async (data) => {
    console.log("data", data);
    const { weight, height, age, sex } = data;
    setSuccess(false);
    setIsSigningIn(true);
    setErrorMessage(false);

    try {
      await apiService.addPlayer(sex, age, weight, height).then((result) => {
        console.log(result);
        setSuccess(true);
        setErrorMessage(false);
      });
    } catch (error) {
      setSuccess(false);
      setErrorMessage(true);
    } finally {
      setIsSigningIn(false);
    }
  };

  const [isSigningIn, setIsSigningIn] = useState(false);

  console.log("errorMessage", errorMessage);
  console.log("success", success);

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
