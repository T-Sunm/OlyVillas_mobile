import React from "react";
import Svg, { Path } from "react-native-svg"
export default function GuestHouse(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 45"
      {...props}
    >
      <Path
        fill="#3C3C3C"
        d="M27 37H17v-2h10v2Zm-2-4h-6v-2h6v2ZM35 8v3h2v2h-2v15a1 1 0 0 1-.883.993L34 29H10a1 1 0 0 1-.993-.883L9 28V13H7v-2h26V8h2Zm-2 5H11v14h7v-8a1 1 0 0 1 .883-.993L19 18h6a1 1 0 0 1 .993.883L26 19v8h7V13Zm-9 7h-4v7h4v-7Zm6-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
      />
    </Svg>
  );
}
