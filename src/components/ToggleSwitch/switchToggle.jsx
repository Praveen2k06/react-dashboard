import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {GoSun} from "react-icons/go";
import {IoMoonOutline} from "react-icons/io5";

const SwitchToggle = ({toggleTheme,theme}) => {
    const [checked, setChecked] = useState(false);

    return (
        <div
            onClick={() => {setChecked(!checked); toggleTheme(!theme)}}
            className="d-flex align-items-center justify-content-center shadow-sm rounded-pill p-1 border"
            style={{
                backgroundColor: theme === "light" ?  "#fff" : "#666669",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
            }}
        >
      <span className="d-flex justify-content-center align-items-center"
          style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              fontSize: "18px",
              fontWeight: "700",
              transform: checked ? "rotateY(360deg)" : "rotateY(0deg)",
              transition: "transform 0.45s ease",
              backfaceVisibility: "hidden",
          }}
      >
        {theme === "light" ?   <IoMoonOutline /> : <GoSun />}
      </span>
        </div>
    );
};

export default SwitchToggle;