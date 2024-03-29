import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import { commerce } from "../../../lib/commerce";

import useStyles from "./styles.js";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Confirmation from "../Confirmation";

const steps = ["Shipping address", "Payment details"];

export default function Checkout({
  cart,
  order,
  handleCaptureCheckout,
  errorMessage,
  activateLoading,
  disableLoading,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    async function generateToken() {
      activateLoading();

      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }

      disableLoading();
    }

    generateToken();
  }, [cart]);

  function nextStep() {
    setActiveStep((prevState) => prevState + 1);
  }

  function backStep() {
    setActiveStep((prevState) => prevState - 1);
  }

  function next(data) {
    setShippingData(data);
    nextStep();
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
        nextStep={nextStep}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation order={order} errorMessage={errorMessage} />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
}
