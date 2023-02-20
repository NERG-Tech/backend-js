import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import * as apiService from "../api-service";
import { Link } from "react-router-dom";

const ShowPlayer = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await apiService.getPlayer().then((result) => {
        setPlayer(result.player);
        console.log("result", result);
      });
    };

    fetchData().catch(console.error);
  }, []);

  if (player) {
    return (
      <Box
        style={{
          display: "flex",
          color: "black",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          flexDirection: "column",
          lineHeight: "180%",
        }}
      >
        <Button LinkComponent={Link} to="/">
          Go back to index page
        </Button>
        <br />
        <Box>Name: {player.name}</Box>
        <Box>sex: {player.sex}</Box>
        <Box>Height: {player.height.cm} cm</Box>
        <Box>Height: {player.height.mt} mt</Box>
        <Box>
          Height: {player.height.feet.feet} feet {player.height.feet.inch} inch{" "}
        </Box>
        <hr />
        <Box>Sport: {player.sport}</Box>
        <Box>position: {player.position}</Box>
        <hr />
        <Box>BMI: {player.bmi}</Box>

        <Box>sex: {player.sex}</Box>
        <Box>
          bloodVolumn: {player.bloodVolumn.value} {player.bloodVolumn.unit}
        </Box>
        <Box>bodyWaterWeight: {player.bodyWaterWeight.kg} kg</Box>
        <Box>bodyWaterWeight: {player.bodyWaterWeight.pounds} pounds</Box>
        <hr />
        <Box>
          MET: {player.met.value} {player.met.unit}
        </Box>
        <Box>Check out console.log it has all info from DB...</Box>
        {/* <Box>Sport: {player.sport}</Box>
        <Box>Sport: {player.sport}</Box>
        <Box>Sport: {player.sport}</Box> */}
      </Box>
    );
  } else {
    return <Box>Not Found</Box>;
  }
};

export default ShowPlayer;
