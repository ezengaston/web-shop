import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

import useStyles from "./styles";

export default function Loader({ isLoading }) {
  const classes = useStyles();

  if (!isLoading) return null;

  return (
    <Box className={classes.box}>
      <CircularProgress />
    </Box>
  );
}
