import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  box: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
}));
