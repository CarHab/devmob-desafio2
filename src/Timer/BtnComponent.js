import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    marginBottom: 15,
  },
  btn: {
    margin: 5,
  },
}));

const BtnComponent = props => {
  const classes = useStyles();
  const { status, start, stop, reset, parcial } = props;

  return (
    <div className={classes.root}>
      {status === 0 ? (
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={start}
        >
          Start
        </Button>
      ) : (
        ""
      )}

      {status === 1 ? (
        <div>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={stop}
          >
            Stop
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={reset}
          >
            Reset
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={parcial}
          >
            Parcial
          </Button>
        </div>
      ) : (
        ""
      )}

      {status === 2 ? (
        <div>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={start}
          >
            Resume
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={reset}
          >
            Reset
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BtnComponent;
