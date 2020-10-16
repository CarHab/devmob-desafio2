import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import cityTimezones from "city-timezones";
import { Typography, Button, TextField } from "@material-ui/core";
import countriesPt from "../Util/countriesPt.json";
import countriesEn from "../Util/countriesEn.json";

const translate = country => {
  const en = countriesEn.filter(item => country.includes(item.name));
  if (en.length === 0) return country;

  const pt = countriesPt.filter(item => item.id === en[0].id);
  return pt[0].name;
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  form: {
    width: "100%",
  },
  texto: {
    fontSize: 30,
  },
  margem: {
    margin: 5,
  },
  hora: {
    color: "red",
  },
}));

const Relogio = () => {
  const classes = useStyles();
  const [obj, setObj] = useState([
    { cidade: "Salvador", pais: "Brazil", tz: "America/Bahia", hora: "" },
  ]);

  const handleClick = event => {
    try {
      event.preventDefault();
      const cidadeStr = event.target.str.value;
      const cityLookup = cityTimezones.lookupViaCity(cidadeStr);

      setObj([]);

      for (let item of cityLookup) {
        setObj(oldObj => [
          ...oldObj,
          { cidade: item.city, pais: item.country, tz: item.timezone },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = setInterval(update, 1);

    return () => {
      clearInterval(token);
    };
  });

  const update = () => {
    setObj([]);
    for (let item of obj) {
      const d = new Date().toLocaleTimeString("pt-BR", { timeZone: item.tz });

      setObj(oldObj => [...oldObj, { ...item, hora: d }]);
    }
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleClick}>
        <TextField
          size="small"
          variant="outlined"
          className={classes.margem}
          id="str"
          name="cidade"
          label="Cidade(em inglês)"
          autoComplete="off"
        />
        <Button
          className={classes.margem}
          type="submit"
          variant="contained"
          color="primary"
        >
          Pesquisar
        </Button>
      </form>
      {obj.length > 0 ? (
        obj.map((item, index) => {
          return (
            <Typography align="center" key={index} className={classes.texto}>
              São <span className={classes.hora}>{`${item.hora || ""}`}</span>{" "}
              em {`${item.cidade}, ${translate(item.pais)}`}
            </Typography>
          );
        })
      ) : (
        <div className={classes.texto}>Cidade não encontrada</div>
      )}
    </div>
  );
};

export default Relogio;
