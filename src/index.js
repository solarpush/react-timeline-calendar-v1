import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { TextDecreaseOutlined } from "@mui/icons-material";
import { ZoomInOutlined } from "@mui/icons-material";
import { ZoomOutOutlined } from "@mui/icons-material";
import { TextIncreaseOutlined } from "@mui/icons-material";
import { ArrowBackIosOutlined } from "@mui/icons-material";
import {
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Button
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './_timeline.scss';
const TimeLine = ({
  list,
  rdvTable,
  clickRdvFunction,
  functionAssign,
  colorSticker,
  colorTeam,
}) => {
  const [today, setToday] = useState(moment().format());
  function generateTimeList() {
    const times = [];
    for (let i = 0; i < 24; i++) {
      let hour = i < 10 ? `0${i}` : i;
      times.push(`${hour}:00`);
    }
    return times;
  }
  const hourStart = generateTimeList();
  const rdv = rdvTable.map((rdv) => {
    const rdvStart = moment.utc(rdv.rdvStart);
    const rdvEnd = moment.utc(rdv.rdvEnd);
    const quarterHour = 15 * 60 * 1000; // 15 minutes in milliseconds
    const roundedStart = moment(
      Math.round(rdvStart / quarterHour) * quarterHour
    ).format();
    const roundedEnd = moment(
      Math.round(rdvEnd / quarterHour) * quarterHour
    ).format();
    const id = rdv.id;
    const assign = rdv.assign;
    const name = rdv.name;
    const cp = rdv.cp;
    const newTable = {
      rdvStart: roundedStart ? roundedStart : null,
      rdvEnd: roundedEnd ? roundedEnd : null,
      id: id ? id : null,
      assign: assign ? assign : null,
      name: name ? name : null,
      cp: cp ? cp : null,
    };
    return newTable;
  });

  const hoursCalcStart = hourStart.map((hour) =>
    moment(hour, "HH:mm").format()
  );
  const [timeToDisplay, setTimeToDisplay] = useState({
    name: "hours",
    data: hourStart,
    display: moment(today).format("ddd DD MMMM"),
    dataCalc: hoursCalcStart,
  });

  const [rowHeight, setRowHeight] = useState(160);
  const [widthView, setWidthView] = useState(1400);
  const separateNumber = timeToDisplay.data.length;
  const [viewType, setViewType] = useState("day");
  const daysInMonth = moment(today).daysInMonth();
  const monthInYear = 12;

  const firstHoursOfDay = moment(today).startOf("day");
  const firstDayOfMonth = moment(today).startOf("month");
  const firstMonthOfYear = moment(today).startOf("Year");
  const [hours, setHours] = useState([]);
  const [days, setDays] = useState([]);
  const [month, setMonth] = useState([]);
  const [hoursCalc, setHoursCalc] = useState([]);
  const [daysCalc, setDaysCalc] = useState([]);
  const [monthCalc, setMonthCalc] = useState([]);
  useEffect(() => {
    let hours = [];
    let days = [];
    let month = [];
    let hoursCalc = [];
    let daysCalc = [];
    let monthCalc = [];
    for (let i = 0; i < 24; i++) {
      const heure = moment(firstHoursOfDay).add(i, "h");
      const format = moment(heure._d).format("HH:mm");
      const calc = moment(heure._d).format();
      hours.push(format);
      hoursCalc.push(calc);
    }
    for (let i = 0; i < daysInMonth; i++) {
      const date = moment(firstDayOfMonth).add(i, "days");
      const format = moment(date._d).format("ddd DD");
      const calc = moment(date._d).format();
      days.push(format);
      daysCalc.push(calc);
    }

    for (let i = 0; i < monthInYear; i++) {
      const date = moment(firstMonthOfYear).add(i, "month");
      const calc = moment(date._d).format();
      const format = moment(date._d).format("MMM YYYY");
      month.push(format);
      monthCalc.push(calc);
    }
    setHours(hours);
    setDays(days);
    setMonth(month);
    setHoursCalc(hoursCalc);
    setDaysCalc(daysCalc);
    setMonthCalc(monthCalc);
    setTimeToDisplay((state) => {
      let res;
      if (state.name === "hours") {
        res = {
          name: state.name,
          data: hours,
          display: moment(today).format("ddd DD MMMM"),
          dataCalc: hoursCalc,
        };
      } else if (state.name === "days") {
        res = {
          name: state.name,
          data: days,
          display: moment(today).format("MMMM YYYY"),
          dataCalc: daysCalc,
        };
      } else if (state.name === "month") {
        res = {
          name: state.name,
          data: month,
          display: moment(today).format("YYYY"),
          dataCalc: monthCalc,
        };
      }
      return res;
    });
  }, [today]);
  const changeZoom = (direction) => {
    direction === "up" && widthView < 6300
      ? setWidthView((state) => state + 700)
      : direction === "down" &&
        widthView > 1400 &&
        setWidthView((state) => state - 700);
  };
  const changeRowHeight = (direction) => {
    direction === "up" && rowHeight < 800
      ? setRowHeight((state) => state + 40)
      : direction === "down" &&
        rowHeight > 41 &&
        setRowHeight((state) => state - 40);
  };
  const changeMoment = (direction) => {
    let result;
    let newHoursCalc;
    if (direction === "down") {
      timeToDisplay.name === "hours"
        ? (result = moment(today).add(1, "days").format())
        : timeToDisplay.name === "days"
        ? (result = moment(today).add(1, "months").format())
        : timeToDisplay.name === "month"
        ? (result = moment(today).add(1, "years").format())
        : (result = moment(today).format());
    } else if (direction === "up") {
      timeToDisplay.name === "hours"
        ? (result = moment(today).subtract(1, "days").format())
        : timeToDisplay.name === "days"
        ? (result = moment(today).subtract(1, "months").format())
        : timeToDisplay.name === "month"
        ? (result = moment(today).subtract(1, "years").format())
        : (result = moment(today).format());
    }
    setToday(result);

    if (direction === "down") {
      timeToDisplay.name === "hours"
        ? (newHoursCalc = hoursCalc.map((hour) =>
            moment(hour).add(1, "day").format()
          ))
        : timeToDisplay.name === "days"
        ? (newHoursCalc = hoursCalc.map((hour) =>
            moment(hour).add(1, "month").format()
          ))
        : timeToDisplay.name === "month"
        ? (newHoursCalc = hoursCalc.map((hour) =>
            moment(hour).add(1, "years").format()
          ))
        : (newHoursCalc = hoursCalc.map((hour) => moment(hour).format()));
    } else if (direction === "up") {
      timeToDisplay.name === "hours"
        ? (newHoursCalc = hoursCalc.map((hour) =>
            moment(hour).subtract(1, "day").format()
          ))
        : timeToDisplay.name === "days"
        ? (newHoursCalc = hoursCalc.map((hour) =>
            moment(hour).subtract(1, "month").format()
          ))
        : timeToDisplay.name === "month"
        ? (newHoursCalc = hoursCalc.map((hour) =>
            moment(hour).subtract(1, "years").format()
          ))
        : (newHoursCalc = hoursCalc.map((hour) => moment(hour).format()));
    }
    setHoursCalc(newHoursCalc);
  };
  const rdvNotAssign = rdv.filter((f) => f.assign === null);
  let rdvFor;
  let rdvAssign = rdv.filter((f) => f.assign !== null);
  let triDay = rdvAssign.filter((f) =>
    moment(f.rdvStart).isBetween(
      moment(today).subtract(5, "d"),
      moment(today).add(5, "d"),
      "d"
    )
  );
  let triMonth = rdvAssign.filter((f) =>
    moment(f.rdvStart).isBetween(
      moment(today).subtract(2, "month"),
      moment(today).add(1, "month"),
      "month"
    )
  );
  let triYear = rdvAssign.filter((f) => moment(f.rdvStart).isSame(today, "y"));
  if (timeToDisplay.name === "hours") {
    rdvFor = triDay;
  } else if (timeToDisplay.name === "days") {
    rdvFor = triMonth;
  } else if (timeToDisplay.name === "month") {
    rdvFor = triYear;
  }
  useEffect(() => {
    function getAssignIndex(name) {
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.name === name) {
          return index;
        }
      }
    }
    const background = colorSticker
      ? colorSticker
      : "linear-gradient(90deg, hsla(31, 98%, 67%, 1) 0%, hsla(36, 97%, 48%, 1) 100%)";
    const shadow = "0px 0px 5px #e8e8e8";
    const radius = "20px";
    //pour chaques rdv

    for (let index = 0; index < rdvFor.length; index++) {
      const i = rdvFor[index];

      //calculIndexStart r'envoi l'index de début pour savoir si le nombre de fraction que va prendre le rendez-vous depasse des fraction disponible ( 24h, 31 jours etc

      function calculIndexStart() {
        let indexStart = -1;
        let indexEnd = -1;
        let firstIndex = false;
        if (timeToDisplay.name === "hours") {
          for (let index = 0; index < hoursCalc.length; index++) {
            const element = hoursCalc[index];
            if (moment(element).isSame(i.rdvStart, "h")) {
              indexStart = index;
            }
            if (moment(element).isSame(i.rdvEnd, "h")) {
              indexEnd = index;
            }
            if (
              moment(element).isBetween(i.rdvStart, i.rdvEnd, "h") &&
              index === 0
            ) {
              firstIndex = true;
            }
          }
        } else if (timeToDisplay.name === "days") {
          for (let index = 0; index < daysCalc.length; index++) {
            const element = daysCalc[index];
            if (moment(element).isSame(i.rdvStart, "d")) {
              indexStart = index;
            }
            if (moment(element).isSame(i.rdvEnd, "d")) {
              indexEnd = index;
            }
            if (
              moment(element).isBetween(i.rdvStart, i.rdvEnd, "d") &&
              index === 0
            ) {
              firstIndex = true;
            }
          }
        } else if (timeToDisplay.name === "month") {
          for (let index = 0; index < monthCalc.length; index++) {
            const element = monthCalc[index];
            if (moment(element).isSame(i.rdvStart, "month")) {
              indexStart = index;
            }
            if (moment(element).isSame(i.rdvEnd, "month")) {
              indexEnd = index;
            }
            if (
              moment(element).isBetween(i.rdvStart, i.rdvEnd, "month") &&
              index === 0
            ) {
              firstIndex = true;
            }
          }
        }

        return {
          indexStart: indexStart,
          indexEnd: indexEnd,
          firstIndex: firstIndex,
        };
      }
      let calc = calculIndexStart();
      // TimeOfRdv calcul de la durée du rdv renvoie une valeur en nombre de fraction afficher à l'écran
      const timeOfRdv = () => {
        let differenceOfIndex = calc.indexEnd - calc.indexStart;
        if (calc.indexEnd === -1 && calc.indexStart !== -1) {
          differenceOfIndex = timeToDisplay.dataCalc.length - calc.indexStart;
        } else if (
          calc.indexEnd === -1 &&
          calc.firstIndex &&
          calc.indexStart === -1
        ) {
          differenceOfIndex = timeToDisplay.dataCalc.length;
        } else if (
          calc.indexEnd !== -1 &&
          calc.firstIndex &&
          calc.indexStart === -1
        ) {
          differenceOfIndex = calc.indexEnd;
        }
        let sizeOfRdv = differenceOfIndex;
        if (sizeOfRdv !== 0) {
          return sizeOfRdv;
        } else {
          return 1;
        }
      };
      const coordonnees = document.getElementById(i.id);
      if (coordonnees !== null) {
        coordonnees.style.paddingTop = "5px";
        coordonnees.style.position = "relative";
        coordonnees.style.height = "100%";
        coordonnees.style.display = "flex";
        coordonnees.style.flexDirection = "column";
        coordonnees.style.justifyContent = "center";
        coordonnees.parentNode.style.width = "100%";
        coordonnees.parentNode.style.heigth = `${rowHeight}px`;
        coordonnees.parentNode.style.display = "flex";
        coordonnees.parentNode.style.flexDirection = "column";
        coordonnees.parentNode.style.justifyContent = "space-around";
        const newDivELement = document.createElement("div");
        const everCreate = document.getElementById(i.id + index);
        const rdvTitle = document.createElement("h5");
        let newStartWithMinute = 0;
        let suppWidthIfTolong = 0;
        if (timeToDisplay.name === "hours") {
          if (moment(i.rdvStart).format("mm") === "15") {
            newStartWithMinute = (widthView / separateNumber) * 0.25;
            if (calc.indexEnd === -1 && calc.indexStart !== -1) {
              suppWidthIfTolong = newStartWithMinute;
            }
          } else if (moment(i.rdvStart).format("mm") === "30") {
            newStartWithMinute = (widthView / separateNumber) * 0.5;
            if (calc.indexEnd === -1 && calc.indexStart !== -1) {
              suppWidthIfTolong = newStartWithMinute;
            }
          } else if (moment(i.rdvStart).format("mm") === "45") {
            newStartWithMinute = (widthView / separateNumber) * 0.75;
            if (calc.indexEnd === -1 && calc.indexStart !== -1) {
              suppWidthIfTolong = newStartWithMinute;
            }
          }
        }
        if (newDivELement !== null && everCreate === null) {
          const rdvWidth =
            (widthView / separateNumber) * timeOfRdv() - suppWidthIfTolong;
          newDivELement.addEventListener("mouseover", () => {
            newDivELement.style.setProperty("z-index", 2);
          });
          newDivELement.addEventListener("mouseout", () => {
            newDivELement.style.setProperty("z-index", 1);
          });

          newDivELement.addEventListener("click", () => {
            clickRdvFunction
              ? clickRdvFunction(i.id)
              : console.log("Arguments clickRdvFunction empty");
          });
          newDivELement.setAttribute("id", i.id + index);
          newDivELement.style.width = `${rdvWidth}px`;
          newDivELement.style.height = "60%";
          newDivELement.style.minHeight = "35px";
          newDivELement.style.position = "absolute";
          newDivELement.style.display = "flex";
          newDivELement.style.justifyContent = "center";
          newDivELement.style.alignItems = "center";
          newDivELement.style.zIndex = 1;
          newDivELement.style.left = calc.firstIndex
            ? "0px"
            : `${newStartWithMinute}px`;
          newDivELement.style.borderRadius = radius;
          newDivELement.style.background = background[getAssignIndex(i.assign)];
          newDivELement.style.boxShadow = shadow;
          newDivELement.style.margin = "0px";
          newDivELement.style.overflow = "hidden";
          newDivELement.style.textAlign = "center";
          if (clickRdvFunction) {
            newDivELement.style.cursor = "pointer";
          }
          rdvTitle.textContent = i.name + " , " + i.cp;
          rdvTitle.style.zIndex = 3;
          rdvTitle.style.color = "rgb(0, 13, 48)";
          rdvTitle.style.width = "90%";

          coordonnees.appendChild(newDivELement);
          newDivELement.appendChild(rdvTitle);
        } else {
          const div = everCreate;
          div.addEventListener("mouseover", () => {
            div.style.setProperty("z-index", 2);
          });
          div.addEventListener("mouseout", () => {
            div.style.setProperty("z-index", 1);
          });
          const rdvWidth =
            (widthView / separateNumber) * timeOfRdv() - suppWidthIfTolong;
          div.style.borderRadius = radius;
          div.style.background = background[getAssignIndex(i.assign)];
          div.style.boxShadow = shadow;
          div.style.margin = "0px";
          div.style.width = `${rdvWidth}px`;
          div.style.height = "60%";
          div.style.minHeight = "35px";
          div.style.position = "absolute";

          div.style.overflow = "hidden";
          div.style.zIndex = 1;
          div.style.left = calc.firstIndex ? "0px" : `${newStartWithMinute}px`;
          div.style.display = "flex";
          div.style.justifyContent = "center";
          div.style.alignItems = "center";
        }
      }
    }
  }, [
    today,
    hoursCalc,
    daysCalc,
    monthCalc,
    hours,
    days,
    month,
    viewType,
    widthView,
    rowHeight,
    rdv,
  ]);

  const changeViewType = (newValue) => {
    if (newValue === "day") {
      setTimeToDisplay({
        name: "hours",
        data: hours,
        display: moment(today).format("ddd DD MMMM"),
        dataCalc: hoursCalc,
      });
      setWidthView(2000);
      setRowHeight(160);
    }
    if (newValue === "month") {
      setTimeToDisplay({
        name: "days",
        data: days,
        display: moment(today).format("MMMM YYYY"),
        dataCalc: daysCalc,
      });
      setWidthView(3600);
      setRowHeight(240);
    }
    if (newValue === "year") {
      setTimeToDisplay({
        name: "month",
        data: month,
        display: moment(today).format("YYYY"),
        dataCalc: monthCalc,
      });
      setWidthView(2000);
      setRowHeight(400);
    }
    setViewType(newValue);
  };

  return (
    <Paper elevation={16} className="timeLinePaperContentContainer">
      {rdvNotAssign.length > 0 && (
        <div id="notAssign">
          <h3>Rendez-vous non assignés</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {rdvNotAssign.map((item) => (
              <div key={item.id} style={{ margin: "5px" }}>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() =>
                    functionAssign
                      ? functionAssign(item.id)
                      : console.log("Argument functionAssign isn't declared")
                  }
                >
                  {item.name +
                    " " +
                    moment(item.rdvStart).format(
                      "DD / MM / YYYY [à] HH[:]mm "
                    ) +
                    " durée de : " +
                    moment(item.rdvEnd).diff(item.rdvStart, "h") +
                    " Heures"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RadioGroup
          row
          aria-labelledby="demo-form-control-label-placement"
          name="position"
          value={viewType}
          onChange={(e, newValue) => {
            changeViewType(newValue);
          }}
        >
          <FormControlLabel
            value="day"
            control={<Radio />}
            label="Jour"
            labelPlacement="top"
          />
          <FormControlLabel
            value="month"
            control={<Radio />}
            label="Mois"
            labelPlacement="top"
          />
          <FormControlLabel
            value="year"
            control={<Radio />}
            label="Année"
            labelPlacement="top"
          />
        </RadioGroup>
        <div>
          <h2>{timeToDisplay.display}</h2>
        </div>
        {/* change row height */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 100,
            height: 30,
          }}
        >
          <TextDecreaseOutlined
            onClick={() => changeRowHeight("down")}
            sx={{ cursor: "pointer" }}
          />
          <Divider orientation="vertical" />
          <TextIncreaseOutlined
            onClick={() => changeRowHeight("up")}
            sx={{ cursor: "pointer" }}
          />
        </div>
        {/* change width of grid */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 100,
            height: 30,
          }}
        >
          <ZoomOutOutlined
            onClick={() => changeZoom("down")}
            sx={{ cursor: "pointer" }}
          />
          <Divider orientation="vertical" />
          <ZoomInOutlined
            onClick={() => changeZoom("up")}
            sx={{ cursor: "pointer" }}
          />
        </div>
        {/* change day/month/years */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 100,
            height: 30,
          }}
        >
          <ArrowBackIosOutlined
            onClick={() => changeMoment("up")}
            sx={{ cursor: "pointer" }}
          />
          <Divider orientation="vertical" />
          <ArrowForwardIosOutlined
            onClick={() => changeMoment("down")}
            sx={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="timeLinePaperContent">
        <Paper elevation={6} className="listContent">
          <Divider />
          {list.map((itemList, index) => (
            <div key={index}>
              <div style={{ height: `${rowHeight}px` }} className="listItem">
                <div
                  style={{
                    background: colorTeam
                      ? colorTeam[index]
                      : "rgb(241, 253, 188)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h4>{itemList.name}</h4>
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </Paper>
        <Paper elevation={6} className="scheduleContent">
          <div
            className="hoursTop"
            style={{
              width: `${widthView}px`,
              minWidth: "95%",
              gridTemplateColumns: `repeat(${separateNumber * 2}, 1fr)`,
            }}
          >
            {timeToDisplay.data.map((item, index) => (
              <div
                key={index}
                className="hoursInTop"
                onClick={() => {
                  if (timeToDisplay.name === "days") {
                    setToday(timeToDisplay.dataCalc[index]);
                    changeViewType("day");
                  } else if (timeToDisplay.name === "month") {
                    setToday(timeToDisplay.dataCalc[index]);
                    changeViewType("month");
                  }
                }}
                style={{
                  gridColumn: "span 2",
                  cursor:
                    timeToDisplay.name === "days" ||
                    timeToDisplay.name === "month"
                      ? "pointer"
                      : "auto",
                }}
              >
                <Divider orientation="vertical" />
                <div>{item}</div>
                <div></div>
              </div>
            ))}
          </div>
          <Divider sx={{ width: `${widthView}px`, minWidth: "95%" }} />
          {list.map((itemList, index) => (
            <div key={index}>
              <div
                className="gridi"
                style={{
                  height: `${rowHeight}px`,
                  width: `${widthView}px`,
                  minWidth: "95%",
                  gridTemplateColumns: `repeat(${separateNumber}, 1fr)`,
                }}
              >
                {timeToDisplay.dataCalc.map((item, index) => (
                  <div className="hoursIn" key={index}>
                    <Divider orientation="vertical" />
                    <div>
                      {rdvFor.map((rdv) => {
                        if (
                          (timeToDisplay.name === "hours" &&
                            moment(rdv.rdvStart).isSame(item, `h`) &&
                            itemList.name === rdv.assign) ||
                          (timeToDisplay.name === "hours" &&
                            moment(item).isBetween(
                              rdv.rdvStart,
                              rdv.rdvEnd,
                              `h`
                            ) &&
                            item === timeToDisplay.dataCalc[0] &&
                            itemList.name === rdv.assign)
                        ) {
                          return <div id={rdv.id} key={rdv.id}></div>;
                        } else if (
                          (timeToDisplay.name === "days" &&
                            moment(rdv.rdvStart).isSame(item, `d`) &&
                            itemList.name === rdv.assign) ||
                          (timeToDisplay.name === "days" &&
                            moment(item).isBetween(
                              rdv.rdvStart,
                              rdv.rdvEnd,
                              `d`
                            ) &&
                            item === timeToDisplay.dataCalc[0] &&
                            itemList.name === rdv.assign)
                        ) {
                          return <div id={rdv.id} key={rdv.id}></div>;
                        } else if (
                          (timeToDisplay.name === "month" &&
                            moment(rdv.rdvStart).isSame(item, `month`) &&
                            itemList.name === rdv.assign) ||
                          (timeToDisplay.name === "month" &&
                            moment(item).isBetween(
                              rdv.rdvStart,
                              rdv.rdvEnd,
                              `month`
                            ) &&
                            item === timeToDisplay.dataCalc[0] &&
                            itemList.name === rdv.assign)
                        ) {
                          return <div key={rdv.id} id={rdv.id}></div>;
                        }
                      })}
                    </div>
                    <div></div>
                  </div>
                ))}
              </div>
              <Divider sx={{ width: `${widthView}px`, minWidth: "95%" }} />
            </div>
          ))}
        </Paper>
      </div>
    </Paper>
  );
};

export default TimeLine;
