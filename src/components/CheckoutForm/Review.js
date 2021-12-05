import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

export default function Review({ checkoutToken, shippingPrice }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Shipping cost" />
          <Typography variant="body2">
            {shippingPrice.formatted_with_symbol}
          </Typography>
        </ListItem>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography varian="subtitle1" style={{ fontWeight: 700 }}>
            {`£${checkoutToken.live.subtotal.raw + shippingPrice.raw}`}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
