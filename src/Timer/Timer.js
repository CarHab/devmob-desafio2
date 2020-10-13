import React, { useEffect, useState } from "react";
import DisplayComponent from "./DisplayComponent";
import BtnComponent from "./BtnComponent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  input: {
    width: "10%",
    margin: 5,
  },
  tempo: {
    fontSize: 60,
  },
  table: {
    border: "1px solid black",
  },
}));

function Timer(props) {
  const classes = useStyles();
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [parciais, setParciais] = useState([]);

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setParciais([]);
  };

  const parcial = () => {
    setParciais([
      ...parciais,
      { h: time.h, m: time.m, s: time.s, ms: time.ms },
    ]);
  };

  let updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    updatedMs++;
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    } else if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    } else if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const getDiferenca = (time1 = { h: 0, m: 0, s: 0, ms: 0 }, time2) => {
    const mTime1 = time1.h * 360000 + time1.m * 6000 + time1.s * 100 + time1.ms;
    const mTime2 = time2.h * 360000 + time2.m * 6000 + time2.s * 100 + time2.ms;

    const mTime3 = mTime2 - mTime1;

    let segundo = Math.floor(mTime3 / 100);
    let minuto = Math.floor(segundo / 60);

    segundo = segundo % 60;

    let hora = Math.floor(minuto / 60);

    minuto = minuto % 60;

    let mili = mTime3 % 100;

    return `${hora >= 10 ? hora : ("0" + hora).split(-2)}:${
      minuto >= 10 ? minuto : ("0" + minuto).split(-2)
    }:${segundo >= 10 ? segundo : ("0" + segundo).split(-2)}:${
      mili >= 10 ? mili : ("0" + mili).split(-2)
    }`;
  };

  return (
    <div>
      <BtnComponent
        status={status}
        start={start}
        stop={stop}
        reset={reset}
        parcial={parcial}
      />
      <DisplayComponent time={time} />

      {parciais.length > 0 ? (
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.table}>Volta</th>
              <th className={classes.table}>Tempo</th>
              <th className={classes.table}>Diferença</th>
            </tr>
          </thead>
          {parciais.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td className={classes.table}>{index + 1}</td>
                  <td className={classes.table}>{`${("0" + item.h).slice(
                    -2
                  )}:${("0" + item.m).slice(-2)}:${("0" + item.s).slice(-2)}:${(
                    "0" + item.ms
                  ).slice(-2)}`}</td>
                  <td className={classes.table}>
                    {getDiferenca(parciais[index - 1], parciais[index])}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : (
        ""
      )}
    </div>
  );
}

export default Timer;
