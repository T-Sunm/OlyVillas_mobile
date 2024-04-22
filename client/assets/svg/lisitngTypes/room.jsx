import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Room(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        enableBackground: "new 0 0 511.999 511.999",
      }}
      viewBox="0 0 511.999 511.999"
      {...props}
    >
      <Path
        d="M207.853 271.997h-15.707v24.148h-24.293v-64.292h24.293v8.142h15.707v-23.849h-55.707v95.706h55.707z"
        style={{
          fill: "#1d1d1b",
        }}
      />
      <Path
        d="M176 248.146h56v15.707h-56zM103.854 56.146H24.147v127.707h79.707V56.146zm-15.707 112H39.853V71.853h48.293v96.293z"
        style={{
          fill: "#1d1d1b",
        }}
      />
      <Path
        d="M47.999 144.146h32v15.707h-32zM56.147 87.999h15.707v40H56.147zM32 192.146h16v15.707H32zM56 192.146h16v15.707H56zM80 192.146h16v15.707H80z"
        style={{
          fill: "#1d1d1b",
        }}
      />
      <Path
        d="M511.999 471.927V456.22H391.852V.147H120.146v456.074H0v15.707h120.146v24.218H0v15.707h511.999v-15.707H391.852v-24.219h120.147zm-135.854 24.217H135.853V15.853h240.293l-.001 480.291z"
        style={{
          fill: "#1d1d1b",
        }}
      />
    </Svg>
  );
}
