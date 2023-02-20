import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import * as apiService from "../api-service";

const ShowPlayer = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await apiService.getPlayer().then((result) => {
        setPlayer(result);
        console.log("result", result);
      });
    };

    fetchData().catch(console.error);
  }, []);
  console.log("player", player);

  return <Box sx={{ display: "flex" }}>{}</Box>;
};

export default ShowPlayer;
