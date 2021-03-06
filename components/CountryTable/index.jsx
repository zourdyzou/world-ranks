/* eslint-disable @next/next/no-img-element */
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";
import Link from "next/link";
import styles from "./CountryTable.module.css";

const orderBy = (countries = [], value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

export const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedByPopulation = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndSwitch = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>

        <button
          className={styles.heading_name}
          onClick={() => setValueAndSwitch("name")}
        >
          <div>Name</div>

          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndSwitch("population")}
        >
          <div>Population</div>

          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndSwitch("area")}
        >
          <div>
            Area (km
            <sup
              style={{
                fontSize: "0.5rem",
              }}
            >
              2
            </sup>
            )
          </div>

          {value === "area" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndSwitch("area")}
        >
          <div>Gini</div>

          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedByPopulation?.map((country) => (
        <Link
          key={country.numericCode}
          href={`/country/${country.alpha3Code}`}
          passHref
        >
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>

            <div className={styles.name}>{country.name}</div>

            <div className={styles.population}>
              {parseInt(country.population).toLocaleString() ?? 0}
            </div>

            <div className={styles.area}>
              {parseInt(country.area).toLocaleString() ?? 0}
            </div>

            <div className={styles.gini}>{country.gini ?? 0}%</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
