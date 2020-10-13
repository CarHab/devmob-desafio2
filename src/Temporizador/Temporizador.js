import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "10%",
    margin: 5,
  },
  tempo: {
    fontSize: 60,
  },
}));

const Temporizador = () => {
  const classes = useStyles();
  const [temp, setTemp] = useState({ h: 0, m: 0, s: 0 });
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [started, setStarted] = useState(false);

  const handleChangeHora = e => {
    setTemp({ h: e.target.value, m: temp.m, s: temp.s });
  };

  const handleChangeMinuto = e => {
    setTemp({ h: temp.h, m: e.target.value, s: temp.s });
  };

  const handleChangeSegundo = e => {
    setTemp({ h: temp.h, m: temp.m, s: e.target.value });
  };

  const handleStart = () => {
    setHoras(temp.h);
    setMinutos(temp.m);
    setSegundos(temp.s);
    setTemp({ h: 0, m: 0, s: 0 });
    setStarted(true);
  };

  const updateTime = useCallback(() => {
    if (horas === 0 && minutos === 0 && segundos === 0) {
      setSegundos(0);
      setMinutos(0);
      setHoras(0);
      if (started) {
        alert("Acabou");
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

  return (
    <div>
      <div className={classes.root}>
        <TextField
          value={temp.h || ""}
          className={classes.input}
          label="Horas"
          variant="outlined"
          size="small"
          onChange={handleChangeHora}
        />
        <TextField
          value={temp.m || ""}
          className={classes.input}
          label="Minutos"
          variant="outlined"
          size="small"
          onChange={handleChangeMinuto}
        />
        <TextField
          value={temp.s || ""}
          className={classes.input}
          label="Segundos"
          variant="outlined"
          size="small"
          onChange={handleChangeSegundo}
        />
        <Button onClick={handleStart} variant="contained" color="primary">
          Start
        </Button>
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
    </div>
  );
};

export default Temporizador;
