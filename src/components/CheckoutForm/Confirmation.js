import React from "react";
import {
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@material-ui/core";

import useStyles from "./Checkout/styles.js";
import { Link } from "react-router-dom";

export default function Confirmation({ order, errorMessage }) {
  const classes = useStyles();

  if (errorMessage) {
    return (
      <>
        <Typography variant="h5">Error: {errorMessage}</Typography>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    );
  }

  if (order.customer) {
    return (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    );
  } else {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }
}
