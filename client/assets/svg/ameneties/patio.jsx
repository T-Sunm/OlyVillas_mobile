import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Patio() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 45"
      width={30}
      height={30}
    >
      <Path
        stroke="#3C3C3C"
        strokeWidth={2}
        d="M22.917 18.926H31M23 8V26.926m0-18a8 8 0 0 1 8 8v10h-8v-18ZM23.083 18.926H15M23 8V26.926m0-18a8 8 0 0 0-8 8v10h8v-18ZM33 26.926v10M29 26.926v10M25 26.926v10M21 26.926v10M17 26.926v10M13 26.926v10M10 36.926h26M10 26.926h26"
      />
    </Svg>
  );
}
