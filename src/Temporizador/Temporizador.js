import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrow from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tempo: {
    fontSize: 60,
  },
  form: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Temporizador = () => {
  const classes = useStyles();
  const [temp, setTemp] = useState({ h: 0, m: 0, s: 0 });
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [started, setStarted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChangeHora = e => {
    let { value } = e.target;
    if (value < 0 || !Number(value)) value = 0;
    return setTemp({ h: Number(value), m: temp.m, s: temp.s });
  };

  const handleChangeMinuto = e => {
    let { value } = e.target;
    value = Number(value);
    if (value > 59) {
      let horas = Math.floor(value / 60);
      let resto = value % 60;
      return setTemp(oldTemp => ({
        h: oldTemp.h + horas,
        m: resto,
        s: oldTemp.s,
      }));
    }
    if (value < 0 || !Number(value)) value = 0;
    return setTemp({ h: temp.h, m: Number(value), s: temp.s });
  };

  const handleChangeSegundo = e => {
    let { value } = e.target;
    value = Number(value);
    if (value > 59) {
      let mins = Math.floor(value / 60);
      let resto = value % 60;
      return setTemp(oldTemp => ({
        h: oldTemp.h,
        m: oldTemp.m + mins,
        s: resto,
      }));
    }
    if (value < 0 || !Number(value)) value = 0;
    return setTemp({ h: temp.h, m: temp.m, s: Number(value) });
  };

  const handleStart = e => {
    e.preventDefault();
    if (temp.h === 0 && temp.m === 0 && temp.s === 0) return;
    setHoras(temp.h);
    setMinutos(temp.m);
    setSegundos(temp.s);
    setTemp({ h: 0, m: 0, s: 0 });
    setStarted(true);
  };

  const handleStop = () => {
    setStarted(false);
    setHoras(0);
    setMinutos(0);
    setSegundos(0);
  };

  const updateTime = useCallback(() => {
    if (horas <= 0 && minutos <= 0 && segundos <= 0) {
      setSegundos(0);
      setMinutos(0);
      setHoras(0);
      if (started) {
        setOpen(true);
        setStarted(false);
      }
    } else {
      if (minutos === 0 && segundos === 0) {
        setHoras(horas => horas - 1);
        setMinutos(59);
        setSegundos(59);
      } else if (segundos === 0) {
        setMinutos(minutos => minutos - 1);
        setSegundos(59);
      } else {
        setSegundos(segundos => segundos - 1);
      }
    }
  }, [horas, minutos, segundos, started]);

  useEffect(() => {
    const token = setTimeout(updateTime, 1000);

    return () => {
      clearTimeout(token);
    };
  }, [horas, minutos, segundos, updateTime]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.root}>
        <form onSubmit={handleStart}>
          <Grid container className={classes.form} spacing={1}>
            <Grid item xs={12} md={2} spacing={1}>
              <TextField
                fullWidth={true}
                value={temp.h || ""}
                label="Horas"
                variant="outlined"
                size="small"
                onChange={handleChangeHora}
                type="number"
                min="0"
              />
            </Grid>
            <Grid item xs={12} md={2} spacing={1}>
              <TextField
                fullWidth={true}
                value={temp.m || ""}
                label="Minutos"
                variant="outlined"
                size="small"
                onChange={handleChangeMinuto}
                type="number"
                min="0"
              />
            </Grid>
            <Grid item xs={12} md={2} spacing={1}>
              <TextField
                fullWidth={true}
                value={temp.s || ""}
                label="Segundos"
                variant="outlined"
                size="small"
                onChange={handleChangeSegundo}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={2} spacing={1}>
              {started ? (
                <Button
                  fullWidth={true}
                  size="large"
                  onClick={handleStop}
                  variant="contained"
                  color="primary"
                >
                  <StopIcon />
                </Button>
              ) : (
                <Button
                  fullWidth={true}
                  type="submit"
                  onClick={handleStart}
                  variant="contained"
                  color="primary"
                >
                  <PlayArrow />
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
      <div className={classes.root}>
        <p className={classes.tempo}>{horas >= 10 ? horas : "0" + horas}</p>
        &nbsp;:&nbsp;
        <p className={classes.tempo}>
          {minutos >= 10 ? minutos : "0" + minutos}
        </p>
        &nbsp;:&nbsp;
        <p className={classes.tempo}>
          {segundos >= 10 ? segundos : "0" + segundos}
        </p>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Acabou!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Temporizador;
