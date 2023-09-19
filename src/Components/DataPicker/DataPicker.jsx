import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import styles from "./DataPicker.module.css";

const DataPicker = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  {
    console.log(format(range[0].startDate, "yyyy-MM-dd"));
  }
  {
    console.log(format(range[0].endDate, "yyyy-MM-dd"));
  }

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const refOne = useRef(null);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className={styles.calendario}>
      <input
        value={` ${format(range[0].startDate, "dd-MM-yyy")} - ${format(
          range[0].endDate,
          "dd-MM-yyy"
        )}`}
        readOnly
        onClick={() => setOpen((open) => !open)}
        className={styles.inputBox}
      />

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className={styles.elemento}
            rangeColors={["#E3B04B"]}
            // disabledDates={["2023-09-10", "2023-09-13"]}
            fixedHeight={false}
          />
        )}
      </div>
    </div>
  );
};

export default DataPicker;
