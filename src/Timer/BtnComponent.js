import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";

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
          <PlayArrowIcon />
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
            <PauseIcon />
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={reset}
          >
            <StopIcon />
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
            <PlayArrowIcon />
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={reset}
          >
            <StopIcon />
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BtnComponent;
