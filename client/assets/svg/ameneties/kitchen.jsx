import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Kitchen() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 45"
      width="40px"
      height="30px"
    >
      <Path
        stroke="#3C3C3C"
        strokeWidth={2}
        d="M11 9.5h24a1 1 0 0 1 1 1v24a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1v-24a1 1 0 0 1 1-1ZM36 17.5H10"
      />
      <Path
        fill="#3C3C3C"
        d="M32 12.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM26 12.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM20 12.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM14 12.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
      />
      <Path
        stroke="#3C3C3C"
        strokeWidth={2}
        d="M14 21.5h18v10H14v-10ZM36 17.5H10"
      />
    </Svg>
  );
}
