import "./App.css";
import { useAuth } from "./auth";
import { useEffect, useRef, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import * as apiService from "./api-service";
import { CLOUD_FUNCTIONS_ORIGIN } from "./functions-origin";

function App() {
  const { user, loading } = useAuth();
  const [dataState, setDataState] = useState(undefined);
  const secureNoteRef = useRef(undefined);

  useEffect(() => {
    (async () => {
      if (!loading) {
        if (user) {
          setDataState("loading");
          const userIdToken = await user.getIdToken();
          try {
            const { secureNote } = await apiService.getUserData({
              userIdToken,
              userId: user.uid,
            });
            secureNoteRef.current = secureNote;
            setDataState("success");
          } catch {
            setDataState("error");
          }
        }
      }
    })();
  }, [user, loading]);

  const child = loading ? (
    <></>
  ) : user ? (
    dataState === "loading" ? (
      <Typography>Getting your data...</Typography>
    ) : dataState === "error" ? (
      <Typography>An error occured.</Typography>
    ) : dataState === "success" ? (
      <div>
        <Typography variant="h6">Secure note</Typography>
        <Typography>{secureNoteRef.current}</Typography>
      </div>
    ) : undefined
  ) : (
    <div>
      <Typography>You're not signed in</Typography>
      <Box
        sx={{
          marginTop: 2,
        }}
      >
        <Box sx={{ color: "black" }}>{CLOUD_FUNCTIONS_ORIGIN}</Box>
        <Button LinkComponent={Link} to="/signin">
          Sign in
        </Button>
        <Button LinkComponent={Link} to="/signup" sx={{ marginLeft: 2 }}>
          Sign up
        </Button>
      </Box>
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {child}
    </div>
  );
}

export default App;
