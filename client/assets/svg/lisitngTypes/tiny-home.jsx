import React from "react";
import Svg, { Path } from "react-native-svg"
export default function TinyHome(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 45"
      {...props}
    >
      <Path
        fill="#3C3C3C"
        d="m36.813 7.606.893 1.788-2.447 1.224V35.5a2 2 0 0 1-1.85 1.994l-.15.006h-22a2 2 0 0 1-1.994-1.851L9.26 35.5V23.618l-1.553.776-.894-1.788 2.447-1.223V13.5h2v6.883L36.813 7.606Zm-3.553 4.012-22 11V35.5h6v-10c0-1.054.816-1.918 1.85-1.995l.15-.005h6c1.053 0 1.917.816 1.994 1.851l.005.149v10h6V11.618Zm-8 13.882h-6v10h6v-10Zm5-8a1 1 0 1 1-.001 2 1 1 0 0 1 0-2Z"
      />
    </Svg>
  );
}
