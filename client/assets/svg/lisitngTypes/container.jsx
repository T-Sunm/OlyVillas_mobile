import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Container() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 45"
      {...props}
    >
      <Path
        fill="#3C3C3C"
        d="M38 35h-2v-2H8v2H6V11a.998.998 0 0 1 .883-.993L7 10h30a.998.998 0 0 1 .993.883L38 11v24Zm-2-23H8v19h28V12Zm-3 17h-2V14h2v15Zm-20 0h-2V14h2v15Zm5 0h-2V14h2v15Zm5 0h-2V14h2v15Zm5 0h-2V14h2v15Z"
      />
    </Svg>
  );
}
