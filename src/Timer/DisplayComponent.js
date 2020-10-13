import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  tempo: {
    fontSize: 60,
  },
}));

const DisplayComponent = props => {
  const classes = useStyles();
  const { h, m, s, ms } = props.time;

  return (
    <div className={classes.root}>
      <p className={classes.tempo}>{h >= 10 ? h : "0" + h}</p>&nbsp;:&nbsp;
      <p className={classes.tempo}>{m >= 10 ? m : "0" + m}</p>&nbsp;:&nbsp;
      <p className={classes.tempo}>{s >= 10 ? s : "0" + s}</p>&nbsp;:&nbsp;
      <p className={classes.tempo}>{ms >= 10 ? ms : "0" + ms}</p>
    </div>
  );
};

export default DisplayComponent;
