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

  const [errorMessage, setErrorMessage] = useState(undefined);
  //   const navigate = useNavigate();
  //   const { signIn } = useAuth();

  const onSubmit = async (data) => {
    const { weight, height, age, sex } = data;
    setIsSigningIn(true);
    setErrorMessage(undefined);

    try {
      const result = apiService.addPlayer(sex, age, weight, height);
      console.log(result);
      if (result._writeTime) {
        setSuccess(true);
      }
      //   await signIn({ email, password });
      //   navigate("/");
    } catch (error) {
      const res = error.response;
      if (res) {
        const code = res.data?.error?.code;
        console.log(code);
      }
      setErrorMessage("Can't sign in right now");
    } finally {
      setIsSigningIn(false);
    }
  };

  const [isSigningIn, setIsSigningIn] = useState(false);

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
          Sign in
        </Button>
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
            {errorMessage}
          </Typography>
        </Box>
      </form>
      <Box>
        <Typography>
          {success && "Add a player is successfully done."}
        </Typography>
      </Box>
    </Box>
  );
}
